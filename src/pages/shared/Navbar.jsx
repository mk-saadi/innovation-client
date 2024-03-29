import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { AlignJustify, X } from "lucide-react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../category/Cart";

const navigation = [{ name: "Home", to: "/", current: true }];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
	const { user, logOut } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogOut = () => {
		logOut();
		localStorage.removeItem("access-token-innovation");
		navigate("/login");
	};

	return (
		<>
			<div className="">
				<Disclosure
					as="nav"
					className="bg-gray-800"
				>
					{({ open }) => (
						<>
							<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
								<div className="flex items-center justify-between h-16">
									<div className="flex items-center">
										<Link
											to="/"
											className="flex-shrink-0"
										>
											<h1 className="font-bold text-amber-500 ">
												INNO
											</h1>
										</Link>
										<div className="hidden md:block">
											<div className="flex items-baseline ml-10 space-x-4">
												{navigation.map((item) => (
													<Link
														key={item.name}
														to={item.to}
														className={classNames(
															item.current
																? "bg-gray-900 text-white"
																: "text-gray-300 hover:bg-gray-700 hover:text-white",
															"rounded-md px-3 py-2 text-sm font-medium"
														)}
														aria-current={
															item.current
																? "page"
																: undefined
														}
													>
														{item.name}
													</Link>
												))}
											</div>
										</div>
									</div>

									<div className="hidden md:block">
										<div className="flex items-center ml-4 md:ml-6">
											{/* Profile dropdown */}
											<Menu
												as="div"
												className="relative mr-5"
											>
												<div>
													<Menu.Button className="relative flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
														<span className="absolute -inset-1.5" />
														<span className="sr-only">
															Open user menu
														</span>
														{user?.photoURL && (
															<img
																className="object-cover w-8 h-8 rounded-full"
																src={
																	user?.photoURL
																}
																alt=""
															/>
														)}
													</Menu.Button>
												</div>
												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
														<Menu.Item>
															<button className="block px-4 py-2 text-sm text-gray-700">
																Profile
															</button>
														</Menu.Item>

														<Menu.Item>
															<button className="block px-4 py-2 text-sm text-gray-700">
																Settings
															</button>
														</Menu.Item>

														<Menu.Item
															onClick={
																handleLogOut
															}
														>
															<button className="block px-4 py-2 text-sm text-gray-700">
																Sign out
															</button>
														</Menu.Item>
													</Menu.Items>
												</Transition>
											</Menu>

											{/* cart item */}
											<div>
												<Cart />
											</div>
										</div>
									</div>

									{/* Mobile menu button */}
									<div className="flex -mr-2 md:hidden justify-start items-center gap-x-2.5">
										<Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
											<span className="absolute -inset-0.5" />
											<span className="sr-only">
												Open main menu
											</span>
											{open ? (
												<X
													className="block w-6 h-6"
													aria-hidden="true"
												/>
											) : (
												<AlignJustify
													className="block w-6 h-6"
													aria-hidden="true"
												/>
											)}
										</Disclosure.Button>

										{/* cart button */}
										<div>
											<Cart />
										</div>
									</div>
								</div>
							</div>

							<Disclosure.Panel className="md:hidden">
								<div className="pt-4 pb-3 border-t border-gray-700">
									<div className="flex items-center px-5">
										<div className="flex-shrink-0">
											{user?.photoURL && (
												<img
													className="object-cover w-10 h-10 rounded-full"
													src={user?.photoURL}
													alt=""
												/>
											)}
										</div>
										<div className="ml-3">
											{user?.displayName && (
												<div className="text-base font-medium leading-none text-white">
													{user?.displayName}
												</div>
											)}
											{user?.email && (
												<div className="text-sm font-medium leading-none text-gray-400">
													{user?.email}
												</div>
											)}
										</div>
									</div>

									{/* mobile menu item(dropdown) */}
									<div className="px-2 mt-3 space-y-1">
										<Disclosure.Button className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white">
											Profile
										</Disclosure.Button>
										<Disclosure.Button className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white">
											Settings
										</Disclosure.Button>
										<Disclosure.Button
											onClick={handleLogOut}
											className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
										>
											Sign out
										</Disclosure.Button>
									</div>
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
		</>
	);
};

export default Navbar;
