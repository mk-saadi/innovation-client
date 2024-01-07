import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../provider/CartProvider";
import { Link } from "react-router-dom";

const Cart = () => {
	const [open, setOpen] = useState(false);

	const { cartItems } = useCart();
	console.log("cartItems: ", cartItems);

	const cartPrice = cartItems.map((ca) => ca.productPrice);

	const totalCartPrice = cartPrice.reduce((accumulator, price) => {
		return accumulator + price;
	}, 0);

	return (
		<>
			<div>
				<button
					type="button"
					className="flex justify-start items-center gap-x-px relative p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
					onClick={() => setOpen(true)}
				>
					<span className="absolute -inset-1.5" />
					<span className="sr-only">open cart</span>
					<ShoppingBag
						className="w-6 h-6"
						aria-hidden="true"
					/>

					<span className="ml-2 text-sm font-medium text-[#fab07a]">{cartItems.length}</span>
				</button>
			</div>

			<Transition.Root
				show={open}
				as={Fragment}
			>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={setOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500 sm:duration-700"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500 sm:duration-700"
									leaveFrom="translate-x-0"
									leaveTo="translate-x-full"
								>
									<Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
										<Transition.Child
											as={Fragment}
											enter="ease-in-out duration-500"
											enterFrom="opacity-0"
											enterTo="opacity-100"
											leave="ease-in-out duration-500"
											leaveFrom="opacity-100"
											leaveTo="opacity-0"
										>
											<div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
												<button
													type="button"
													className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
													onClick={() => setOpen(false)}
												>
													<span className="absolute -inset-2.5" />
													<span className="sr-only">Close panel</span>
													<X
														className="h-6 w-6"
														aria-hidden="true"
													/>
												</button>
											</div>
										</Transition.Child>
										<div className="flex h-full flex-col overflow-y-scroll  overflow-x-hidden bg-white py-6 shadow-xl">
											<div className="px-4 sm:px-6">
												<Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
													Panel title
												</Dialog.Title>
											</div>
											<div className="relative mt-6 flex-1 px-4 sm:px-6">
												{/* Your content */}
												<div className="h-full mx-2 bg-white overflow-y-auto overflow-x-hidden">
													<div>
														<p>${totalCartPrice.toFixed(2)}</p>
														<button>Checkout</button>
													</div>
													{cartItems.map((ca) => (
														<div
															key={ca.id}
															className="flex mb-2.5 flex-col py-2 border-b border-amber-900/30"
														>
															<div className="flex gap-x-1.5">
																<div>
																	<img
																		src={ca.productImage}
																		alt=""
																		className="h-20 w-32 object-cover rounded-md"
																	/>
																</div>
																<div className="flex flex-col flex-1 ml-4">
																	<div>
																		<div className="flex justify-between text-base font-medium text-gray-900">
																			<h3>
																				<Link
																					to={`/product/${ca?.productId}`}
																					className="hover:underline"
																					onClick={() =>
																						setOpen(false)
																					}
																				>
																					{ca.productName}
																				</Link>
																			</h3>
																			<p className="ml-4">
																				${ca.productPrice.toFixed(2)}
																			</p>
																		</div>
																	</div>
																	<div className="flex items-end justify-between flex-1 text-sm">
																		<p className="text-gray-500">
																			Qty {ca.quantity}
																		</p>

																		<div className="flex">
																			<button
																				type="button"
																				className="font-medium  text-red-500/70 hover:text-red-500 hover:underline"
																			>
																				Remove
																			</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													))}
												</div>
												<div className="absolute bottom-0 w-full -mb-2 flex justify-center mt-6 text-sm text-center text-gray-500">
													<p>
														or
														<button
															type="button"
															className="ml-2 font-medium text-orange-500 hover:text-orange-400"
															onClick={() => setOpen(false)}
														>
															Continue Shopping
															<span aria-hidden="true"> &rarr;</span>
														</button>
													</p>
												</div>
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default Cart;
