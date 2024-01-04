import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";

const Main = () => {
	return (
		<div className="w-full">
			<Navbar />
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default Main;
