import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ProductSwiper from "./ProductSwiper";
import { ShoppingBag, StarHalf, StarIcon } from "lucide-react";
import useScrollToTop from "../../../hooks/useScrollToTop";
import { Fade } from "react-awesome-reveal";
import { useCart } from "../../../provider/CartProvider";
import useToast from "../../../hooks/useToast";
import Toast from "../../../hooks/Toast";

const ProductDetail = () => {
	const [product, setProduct] = useState([]);
	const { id } = useParams();
	const { addToCart } = useCart();
	const { toastType, toastMessage, showToast, hideToast } = useToast();

	useScrollToTop();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`https://dummyjson.com/products/${id}`);
				if (res.data) {
					setProduct(res.data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [id]);

	const discountedPrice = product?.price - (product?.price * product?.discountPercentage) / 100;

	const handleCart = () => {
		const productPrice = discountedPrice.toFixed(2);
		const productId = id;
		const productImage = product.thumbnail;
		const productName = product?.title;

		const cartItem = {
			productPrice: JSON.parse(productPrice),
			productId,
			productImage,
			productName,
		};
		addToCart(cartItem);

		if (addToCart) {
			showToast("success", "Added to cart!");
		}
	};

	return (
		<>
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}

			<div className="flex flex-col min-h-screen mx-auto mt-2 bg-white xl:max-w-5xl lg:max-w-4xl md:max-w-2xl">
				<div className="grid grid-cols-1 mx-2 gap-x-8 lg:grid-cols-2 md:mx-4 lg:mx-8">
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

							<div className="flex items-center justify-start gap-x-6 mt-2 mb-1.5">
								<p className="flex justify-start items-center gap-x-1.5 text-2xl tracking-tight text-gray-900">
									Price{" "}
									{product.discountPercentage ? (
										<span className="ml-1 line-through">${product.price}</span>
									) : (
										<span>${product.price}</span>
									)}
									<span className="ml-2">
										{discountedPrice && <span>${discountedPrice.toFixed(2)}</span>}
									</span>
								</p>
								<span className="text-xl tracking-tight text-red-500/70">
									-{product.discountPercentage}%
								</span>
							</div>

							{/* rating */}
							<div className="flex items-center justify-start rating-stars text-amber-500">
								<span className="mr-2 text-gray-700">Rating </span>
								<RatingStars rating={product.rating} />
							</div>
							<p className="mb-4 text-gray-700">From {product.brand}</p>

							<div className="text-gray-700 max-w-prose">
								<p>{product.description}</p>
							</div>

							<div>
								<button
									onClick={handleCart}
									className="flex px-3 py-2 mt-6 text-white rounded-md shadow-md bg-amber-500 drop-shadow-md active:scale-95 gap-x-1.5"
								>
									<span className="sr-only">Add to cart</span>
									<ShoppingBag />
									Add to cart
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="mx-2 mt-20 mb-12 border-t border-gray-700/50">
					<h2 className="mb-6 text-lg font-semibold text-gray-700">Similar products</h2>
					<SimilarProduct category={product.category} />
				</div>
			</div>
		</>
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

// eslint-disable-next-line react/prop-types
const SimilarProduct = ({ category }) => {
	const [similarProducts, setSimilarProducts] = useState([]);

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
		<div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-x-4 gap-y-4">
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
								<span className="hidden mx-2 lg:block"> - </span>
								<p className="text-gray-500">{product?.stock} in stock</p>
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
