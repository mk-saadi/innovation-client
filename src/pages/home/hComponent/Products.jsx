import axios from "axios";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const Products = () => {
	const [products, setProducts] = useState([]);
	console.log("products: ", products);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get("https://dummyjson.com/products");
				if (res.data) {
					setProducts(res.data.products);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			{" "}
			<div className="bg-white">
				<div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<h2 className="sr-only">Products</h2>

					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
						{products.map((product) => (
							<Fade
								key={product?.id}
								triggerOnce
								damping={0.5}
							>
								<Link
									to={`/product/${product?.id}`}
									className="group"
								>
									<div
										// className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7"
										className=""
									>
										<img
											src={product?.images[0]}
											alt={product?.title}
											className="object-cover object-center w-full h-full group-hover:opacity-75"
										/>
									</div>
									<div>
										<h3 className="mt-4 text-sm text-gray-700">
											{product?.title}
										</h3>
										<p className="mt-1 text-lg font-medium text-gray-900">
											$ {product?.price}
										</p>
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

export default Products;
