import axios from "axios";
import { ArrowUpDown, StarHalf, StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const Products = () => {
	// const [products, setProducts] = useState([]);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const res = await axios.get("https://dummyjson.com/products");
	// 			if (res.data) {
	// 				setProducts(res.data.products);
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};

	// 	fetchData();
	// }, []);

	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					`https://dummyjson.com/products/search?q=${searchTerm}`
				);
				if (res.data) {
					setProducts(res.data.products);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [searchTerm]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const sortProductsByPrice = () => {
		const sortedProducts = [...products].sort(
			(a, b) => (a.price - b.price) * sortOrder
		);
		setProducts(sortedProducts);
		setSortOrder(sortOrder * -1); // toggle between 1 and -1
	};

	return (
		<div>
			{" "}
			<div className="bg-white">
				<div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<h2 className="sr-only">Products</h2>

					<div className="flex flex-row items-center justify-start mb-6 gap-x-8">
						<input
							type="text"
							value={searchTerm}
							onChange={handleSearchChange}
							placeholder="Search products..."
							className=""
							id="inputForm"
						/>

						<button
							onClick={sortProductsByPrice}
							className="flex font-semibold duration-150 group gap-x-2 text-amber-700 hover:underline hover:text-amber-600 whitespace-nowrap"
						>
							<ArrowUpDown className="duration-200 group-active:rotate-180" />{" "}
							Sort by Price
						</button>
					</div>

					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
						{products.map((product) => (
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
												className="object-cover w-full duration-300 md:h-36 xl:h-48 lg:h-44 group-hover:scale-105 rounded-t-xl"
											/>
										</div>
									</div>
									<div className="mx-2 mb-2">
										<h3 className="mt-4 text-xl font-medium text-gray-700 duration-200 group-hover:underline group-hover:text-amber-600">
											{product?.title}
										</h3>
										<div className="flex items-center justify-start rating-stars text-amber-500">
											<RatingStars
												rating={product.rating}
											/>
										</div>

										<div className="flex mt-1 text-lg font-medium text-gray-700">
											<p className="">
												Price: ${product?.price}
											</p>
											<span className="mx-2"> - </span>
											<p className="text-gray-500">
												{product?.stock} in stock
											</p>
										</div>
									</div>

									<div className="absolute px-4 py-2 font-medium text-white bg-red-500 rounded-full shadow-xl top-3 -right-3 drop-shadow-md">
										<p>{product.discountPercentage}% OFF</p>
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

export default Products;
