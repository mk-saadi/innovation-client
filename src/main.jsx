import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./AuthProvider";
import Register from "./pages/shared/Register";
import Login from "./pages/shared/Login";

const router = createBrowserRouter([
	{
		path: "/",
		element: <div>Hello world!</div>,
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
			<div className="flex flex-col h-screen">
				<div className="flex w-full min-h-screen border border-black flex-sol">
					<RouterProvider router={router} />
				</div>
			</div>
		</AuthProvider>
	</React.StrictMode>
);
