import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./provider/AuthProvider";
import Register from "./pages/shared/Register";
import Login from "./pages/shared/Login";
import Main from "./layout/Main";
import PrivateRoute from "./route/PrivateRoute";
import Home from "./pages/home/Home";
import ProductDetail from "./pages/home/hComponent/ProductDetail";
import CategoryProducts from "./pages/category/CategoryProduct";
import { CartProvider } from "./provider/CartProvider";
import Checkout from "./pages/checkout/Checkout";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<PrivateRoute>
				<Main />
			</PrivateRoute>
		),
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/product/:id",
				element: <ProductDetail />,
			},
			{
				path: "/:category",
				element: <CategoryProducts />,
			},
			{
				path: "/checkout",
				element: <Checkout />,
			},
		],
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<CartProvider>
				<div className="flex flex-col h-screen bg-white">
					<div className="flex w-full min-h-screen bg-white flex-sol">
						<RouterProvider router={router} />
					</div>
				</div>
			</CartProvider>
		</AuthProvider>
	</React.StrictMode>
);
