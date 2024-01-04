import { useContext, useState } from "react";
import "./auth.css";
import axios from "axios";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { AuthContext } from "../../provider/AuthProvider";
import Toast from "../../hooks/Toast";

const Login = () => {
	const { signIn } = useContext(AuthContext);
	const [activeInput, setActiveInput] = useState("");
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const navigate = useNavigate();

	const handleFocus = (e) => {
		setActiveInput(e.target.name);
	};

	const handleBlur = () => {
		setActiveInput("");
	};

	const handleLogin = async (event) => {
		event.preventDefault();
		showToast("loading", "Please wait!");

		const form = event.target;
		const email = form.email.value;
		const passwordInput = form.password;
		const password = passwordInput.value;

		if (password.length < 8) {
			showToast("error", "password must be at least 8 characters");
			passwordInput.value = "";
			return;
		}

		try {
			const res = await signIn(email, password);
			const user = res.user;
			if (user.uid) {
				showToast(
					"success",
					`successfully signed in as ${user.displayName}`
				);

				form.reset();

				setTimeout(() => {
					showToast("loading", "Redirecting");
					setTimeout(() => {
						navigate("/");
					}, 500);
				}, 1000);
			}
		} catch (error) {
			passwordInput.value = "";
			showToast("error", "Error, please try again");
		}
	};

	const [showPassword, setShowPassword] = useState(false);
	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<>
			<div className="flex items-center justify-center w-full max-h-screen px-2 md:px-28 lg:p-10 bg-gradient-to-r from-amber-500 to-amber-600">
				{toastType && (
					<Toast
						type={toastType}
						message={toastMessage}
						onHide={hideToast}
					/>
				)}
				<div className="w-full">
					<div className="relative w-full pt-8 mx-auto shadow-2xl lg:w-1/2 rounded-xl bg-amber-50 drop-shadow-md">
						<form
							onSubmit={handleLogin}
							className="flex flex-col w-full  gap-y-1.5 drop-shadow-sm"
						>
							<Fade
								cascade
								direction="up"
								damping={0.1}
								className="flex flex-col items-center justify-center w-full"
							>
								<div className="flex flex-row items-center justify-center w-full text-gray-700 font-semibold text-xl mb-5 gap-x-1.5">
									<span>
										<UserPlus />
									</span>
									<h1 className="">Login</h1>
								</div>

								<div
									className="bg-[#cacaca88] w-4/5"
									style={{
										borderLeft:
											activeInput === "email"
												? "3px solid #fab07a"
												: "",
										paddingLeft:
											activeInput === "email"
												? "7px"
												: "",
									}}
									onFocus={handleFocus}
									onBlur={handleBlur}
									id="parag"
									tabIndex={1}
								>
									<p className="text-sm font-medium text-gray-500">
										Your Email
									</p>
									<input
										type="text"
										id="inputForm"
										name="email"
										required
									/>
								</div>

								<div
									className="bg-[#cacaca88] w-4/5"
									style={{
										borderLeft:
											activeInput === "password"
												? "3px solid #fab07a"
												: "",
										paddingLeft:
											activeInput === "password"
												? "7px"
												: "",
									}}
									onFocus={handleFocus}
									onBlur={handleBlur}
									id="parag"
									tabIndex={1}
								>
									<p className="text-sm font-medium text-gray-500">
										Password
									</p>
									<div className="flex">
										<input
											id="inputForm"
											name="password"
											autoComplete="off"
											required
											type={
												showPassword
													? "text"
													: "password"
											}
										/>

										<button
											type="button"
											onClick={handleTogglePassword}
											className="text-gray-700 outline-none"
										>
											{showPassword ? (
												<EyeOff />
											) : (
												<Eye />
											)}
										</button>
									</div>
								</div>

								<input
									type="submit"
									value="Login"
									className="w-1/2 submitButton"
								/>
							</Fade>
						</form>

						<Fade
							className="flex items-center justify-center pb-5"
							damping={1}
						>
							<div className="flex items-center justify-center gap-x-2">
								<p className="font-medium text-gray-500">
									New to website?
								</p>
								<Link
									className="font-semibold duration-150 text-amber-700 hover:underline hover:text-amber-600"
									to="/register"
								>
									Register
								</Link>
							</div>
						</Fade>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
