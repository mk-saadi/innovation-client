import { useCart } from "../../provider/CartProvider";

const Checkout = () => {
	const { cartItems } = useCart();
	console.log("cartItems: ", cartItems);

	return (
		<div>
			<div>
				<div>
					{cartItems === 0 ? (
						<div>
							<p className="mt-10 text-4xl text-gray-700">nothing to show</p>
						</div>
					) : (
						cartItems.map((ca) => (
							<div key={ca.productId}>
								<div>
									<img
										src={ca.productImage}
										alt=""
									/>
								</div>
								<div>
									<p>{ca.productName}</p>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Checkout;
