import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductSwiper from "./ProductSwiper";
import { StarHalf, StarIcon } from "lucide-react";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const ProductDetail = () => {
	const [product, setProduct] = useState([]);
	console.log("product: ", product);
	const { id } = useParams();

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
		<div className="flex flex-col min-h-screen">
			<div>
				<div className="w-full">
					<ProductSwiper product={product} />
				</div>

				<div>
					<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							{product.title}
						</h1>
					</div>

					<div className="mt-4 lg:row-span-3 lg:mt-0">
						<h2 className="sr-only">Product information</h2>
						<p className="text-3xl tracking-tight text-gray-900">
							{product.price}
						</p>

						{/* Reviews */}
						<div className="flex rating-stars text-amber-500">
							<RatingStars rating={product.rating} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

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

export default ProductDetail;
