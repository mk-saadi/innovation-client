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

	// const totalIndividualPrice= prod;

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
									<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
										<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
											<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
												<div className="flex items-start justify-between">
													<Dialog.Title className="text-lg font-medium text-gray-900">
														Shopping cart
													</Dialog.Title>
													<div className="ml-3 flex h-7 items-center">
														<button
															type="button"
															className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
															onClick={() => setOpen(false)}
														>
															<span className="absolute -inset-0.5" />
															<span className="sr-only">Close panel</span>
															<X
																className="h-6 w-6"
																aria-hidden="true"
															/>
														</button>
													</div>
												</div>

												<div className="mt-8">
													<div className="flow-root">
														<ul
															role="list"
															className="-my-6 divide-y divide-gray-200"
														>
															{cartItems.map((product) => (
																<li
																	key={product.id}
																	className="flex py-6"
																>
																	<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
																		<img
																			src={product.productImage}
																			alt={product.productName}
																			className="h-full w-full object-cover object-center"
																		/>
																	</div>

																	<div className="ml-4 flex flex-1 flex-col">
																		<div>
																			<div className="flex justify-between text-base font-medium text-gray-900">
																				<h3>
																					<Link
																						className="hover:underline"
																						to={`/product/${product.productId}`}
																					>
																						{product.productName}
																					</Link>
																				</h3>
																				<p className="ml-4">
																					$
																					{product.productPrice *
																						product.quantity}
																				</p>
																			</div>
																		</div>
																		<div className="flex flex-1 items-end justify-between text-sm">
																			<p className="text-gray-500">
																				Qty {product.quantity}
																			</p>

																			<div className="flex">
																				<button
																					type="button"
																					className="font-medium text-amber-600 hover:text-amber-500 hover:underline"
																				>
																					Remove
																				</button>
																			</div>
																		</div>
																	</div>
																</li>
															))}
														</ul>
													</div>
												</div>
											</div>

											<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
												<div className="flex justify-between text-base font-medium text-gray-900">
													<p>Subtotal</p>
													<p>${totalCartPrice}</p>
												</div>
												<p className="mt-0.5 text-sm text-gray-500">
													Shipping and taxes calculated at checkout.
												</p>
												<div className="mt-6">
													<Link
														to="/checkout"
														className="flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-6 py-3 text-base font-medium text-white hover:bg-amber-700 active:scale-95 duration-200 shadow-md"
													>
														Checkout
													</Link>
												</div>
												<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
													<p>
														or
														<button
															type="button"
															className="font-medium text-amber-600 hover:text-amber-500 ml-2"
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
