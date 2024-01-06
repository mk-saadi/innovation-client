import useScrollToTop from "../../hooks/useScrollToTop";
import Products from "./hComponent/Products";

const Home = () => {
	useScrollToTop();

	return (
		<div className="min-h-screen">
			<Products />
		</div>
	);
};

export default Home;
