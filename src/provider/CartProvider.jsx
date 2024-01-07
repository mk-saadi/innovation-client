/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_CART": {
			const updatedCart = [...state.cartItems, action.payload];
			localStorage.setItem(
				"cartItemsInnovation",
				JSON.stringify(updatedCart)
			);
			return {
				...state,
				cartItems: updatedCart,
			};
		}
		default:
			return state;
	}
};

const CartProvider = ({ children }) => {
	const storedCartItems =
		JSON.parse(localStorage.getItem("cartItemsInnovation")) || [];
	const [state, dispatch] = useReducer(cartReducer, {
		cartItems: storedCartItems,
	});

	const addToCart = (item) => {
		dispatch({ type: "ADD_TO_CART", payload: item });
	};

	useEffect(() => {
		localStorage.setItem(
			"cartItemsInnovation",
			JSON.stringify(state.cartItems)
		);
	}, [state.cartItems]);

	return (
		<CartContext.Provider value={{ ...state, addToCart }}>
			{children}
		</CartContext.Provider>
	);
};

const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};

export { CartProvider, useCart };
