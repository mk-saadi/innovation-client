import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductSwiper from "./ProductSwiper";

const ProductDetail = () => {
	const [product, setProduct] = useState([]);
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
					<p className="text-gray-700">{product.title}</p>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
