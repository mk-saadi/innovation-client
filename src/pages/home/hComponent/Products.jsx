import axios from "axios";
import { ArrowUpDown, StarHalf, StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import useScrollToTop from "../../../hooks/useScrollToTop";
import "../../shared/auth.css";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 12;

	// useScrollToTop();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`https://dummyjson.com/products/search?q=${searchTerm}`);
				if (res.data) {
					setProducts(res.data.products);
					setCurrentPage(1);
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
		const sortedProducts = [...products].sort((a, b) => (a.price - b.price) * sortOrder);
		setProducts(sortedProducts);
		setSortOrder(sortOrder * -1);
	};

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div>
			{" "}
			<div className="bg-white">
				<div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<h2 className="sr-only">Products</h2>

					<div className="flex flex-row items-center w-full mb-6 gap-x-8">
						<input
							type="text"
							value={searchTerm}
							onChange={handleSearchChange}
							placeholder="Search products..."
							className="pb-1 pl-3 border shadow-sm border-amber-900/30 rounded-xl"
							id="inputForm"
						/>

						<div className="">
							<button
								onClick={sortProductsByPrice}
								className="flex w-full font-semibold duration-150 group gap-x-2 text-amber-500 hover:underline hover:text-amber-600 whitespace-nowrap"
							>
								<ArrowUpDown /> Sort by Price
							</button>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
						{currentProducts.map((product) => (
							<Fade
								key={product?.id}
								triggerOnce
								damping={0.5}
								className="duration-100 bg-gray-200 border shadow-sm hover:bg-gray-100 rounded-xl hover:border-amber-900/20"
							>
								<Link
									to={`/product/${product?.id}`}
									className="relative group rounded-xl "
								>
									<div className="overflow-hidden">
										<div className="">
											<img
												src={product?.thumbnail}
												alt={product?.title}
												className="h-40 object-cover w-full duration-300 md:h-36 xl:h-48 lg:h-44 group-hover:scale-105 rounded-t-xl"
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

									<div className="absolute lg:px-4 py-1 px-2 lg:py-2 font-medium  text-white bg-red-500 md:text-sm text-xs rounded-full shadow-xl top-3 -right-3 drop-shadow-md ">
										<p>-{product.discountPercentage}% OFF</p>
									</div>
								</Link>
							</Fade>
						))}
					</div>
					{/* Pagination controls */}
					<div className="flex items-center justify-center w-full mt-12">
						{Array.from(
							{
								length: Math.ceil(products.length / productsPerPage),
							},
							(_, index) => (
								<button
									key={index}
									onClick={() => paginate(index + 1)}
									className={`duration-200 font-semibold rounded-md text-lg ${
										currentPage === index + 1
											? "bg-amber-500 text-white shadow-md px-4"
											: "px-4 text-gray-700 hover:underline"
									}`}
								>
									{index + 1}
								</button>
							)
						)}
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
