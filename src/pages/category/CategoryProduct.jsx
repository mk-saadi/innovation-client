import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { StarHalf, StarIcon } from "lucide-react";

const CategoryProducts = () => {
	const [similarProducts, setSimilarProducts] = useState([]);
	const { category } = useParams();

	useEffect(() => {
		const fetchSimilarProducts = async () => {
			try {
				const response = await axios.get(`https://dummyjson.com/products/category/${category}`);

				if (response.status === 200) {
					setSimilarProducts(response.data.products);
				}
			} catch (error) {
				console.error("Error fetching similar products:", error);
			}
		};

		fetchSimilarProducts();
	}, [category]);

	return (
		<div>
			{" "}
			<div className="bg-white">
				<div className="max-w-2xl px-4 py-12 mx-auto sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
					<h2 className="sr-only">{category}</h2>

					<h2 className="text-lg font-semibold text-gray-700 mb-2">
						Showing all products from {category} category
					</h2>
					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
						{similarProducts.map((product) => (
							<Fade
								key={product?.id}
								triggerOnce
								damping={0.5}
								className="duration-100 bg-gray-200 hover:bg-gray-100 hover:shadow-md rounded-xl"
							>
								<Link
									to={`/product/${product?.id}`}
									className="relative group rounded-xl "
								>
									<div className="">
										<div className="">
											<img
												src={product?.thumbnail}
												alt={product?.title}
												className="object-cover w-full duration-300 h-40 md:h-36 xl:h-48 lg:h-44 group-hover:scale-105 rounded-t-xl"
											/>
										</div>
									</div>
									<div className="mx-2 mb-2">
										<h3 className="mt-4 text-xl font-medium text-gray-700 duration-200 group-hover:underline group-hover:text-amber-600">
											{product?.title}
										</h3>
										<div className="flex items-center justify-start rating-stars text-amber-500">
											<RatingStars rating={product.rating} />
										</div>

										<div className="flex lg:flex-row flex-col mt-1 text-lg font-medium text-gray-700">
											<p className="">Price: ${product?.price}</p>
											<span className="mx-2 hidden lg:block"> - </span>
											<p className="text-gray-500">{product?.stock} in stock</p>
										</div>
									</div>

									<div className="absolute px-4 py-2 md:text-sm text-xs  font-medium text-white bg-red-500 rounded-full shadow-xl top-3 -right-3 drop-shadow-md">
										<p>-{product.discountPercentage}% OFF</p>
									</div>
								</Link>
							</Fade>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

// eslint-disable-next-line react/prop-types
const RatingStars = ({ rating }) => {
	const renderStars = () => {
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 !== 0;

		const stars = [];

		for (let i = 0; i < fullStars; i++) {
			stars.push(
				<StarIcon
					className="w-4 h-4 lg:w-5 lg:h-5"
					key={i}
				/>
			);
		}

		if (hasHalfStar) {
			stars.push(
				<StarHalf
					className="w-4 h-4 lg:w-5 lg:h-5"
					key="half"
				/>
			);
		}

		return stars;
	};

	return <div className="flex items-center">{renderStars()}</div>;
};

export default CategoryProducts;
