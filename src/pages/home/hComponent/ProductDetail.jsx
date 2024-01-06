import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ProductSwiper from "./ProductSwiper";
import { StarHalf, StarIcon } from "lucide-react";
import useScrollToTop from "../../../hooks/useScrollToTop";
import { Fade } from "react-awesome-reveal";

const ProductDetail = () => {
	const [product, setProduct] = useState([]);
	const { id } = useParams();

	useScrollToTop();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					`https://dummyjson.com/products/${id}`
				);
				if (res.data) {
					setProduct(res.data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [id]);

	return (
		<div className="flex flex-col min-h-screen mx-auto mt-2 bg-white xl:max-w-5xl lg:max-w-4xl md:max-w-2xl">
			<div className="grid grid-cols-1 mx-2 lg:grid-cols-2 md:mx-4 lg:mx-8">
				{/* first col */}
				<div className="w-full">
					<div className="flex flex-row items-center justify-start font-medium text-gray-700 gap-x-1">
						<Link
							to="/"
							className="hover:underline"
						>
							Home
						</Link>
						<span className="mx-2">/</span>
						<Link
							className="hover:underline"
							to={`/${product.category}`}
						>
							{product.category}
						</Link>
					</div>
					<ProductSwiper product={product} />
				</div>

				{/* second col */}
				<div>
					<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							{product.title}
						</h1>
					</div>

					<div className="mt-4 lg:row-span-3 lg:mt-0">
						<h2 className="sr-only">Product information</h2>
						<p className="text-3xl tracking-tight text-gray-900">
							$ {product.price}
						</p>

						{/* rating */}
						<div className="flex items-center justify-start rating-stars text-amber-500">
							<span className="text-gray-700">Rating </span>
							<RatingStars rating={product.rating} />
						</div>

						<div className="text-gray-700">
							<p>{product.description}</p>
							<p>{product.description}</p>
							<p>{product.description}</p>
							<p>{product.description}</p>
							<p>{product.description}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 ">
				<h2 className="text-lg font-semibold text-gray-700">
					Similar products
				</h2>
				<SimilarProduct category={product.category} />
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
			stars.push(<StarIcon key={i} />);
		}

		if (hasHalfStar) {
			stars.push(<StarHalf key="half" />);
		}

		return stars;
	};

	return <div className="flex items-center">{renderStars()}</div>;
};

const SimilarProduct = ({ category }) => {
	const [similarProducts, setSimilarProducts] = useState([]);

	useEffect(() => {
		const fetchSimilarProducts = async () => {
			try {
				const response = await axios.get(
					`https://dummyjson.com/products/category/${category}`
				);

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
		<div className="grid grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-x-4 gap-y-4">
			{similarProducts.slice(0, 5).map((product) => (
				<Fade
					key={product?.id}
					triggerOnce
					damping={0.5}
					className="duration-100 bg-gray-200 hover:bg-gray-100 hover:shadow-md rounded-xl"
				>
					<a
						href={`/product/${product?.id}`}
						className="relative group rounded-xl "
					>
						<div className="">
							<div className="">
								<img
									src={product?.thumbnail}
									alt={product?.title}
									className="object-cover w-full h-24 duration-300 xl:h-36 group-hover:scale-105 rounded-t-xl"
								/>
							</div>
						</div>
						<div className="mx-2 mb-2">
							<h3 className="mt-4 font-medium text-gray-700 duration-200 md:text-lg group-hover:underline group-hover:text-amber-600">
								{product?.title}
							</h3>

							<div className="flex flex-col mt-1 text-sm font-medium text-gray-700 lg:flex-row md:text-base">
								<p className="">Price: ${product?.price}</p>
								<span className="hidden mx-2 lg:block">
									{" "}
									-{" "}
								</span>
								<p className="text-gray-500">
									{product?.stock} in stock
								</p>
							</div>
						</div>

						<div className="absolute px-2 py-1 text-xs text-white bg-red-500 rounded-full shadow-md md:text-sm top-3 -right-3 drop-shadow-md">
							<p>{product.discountPercentage}% OFF</p>
						</div>
					</a>
				</Fade>
			))}
		</div>
	);
};

export default ProductDetail;
