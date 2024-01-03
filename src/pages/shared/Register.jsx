import { useContext, useState } from "react";
import "./auth.css";
import axios from "axios";
import { Eye, EyeOff, ImagePlus, User } from "lucide-react";
import imageCompression from "browser-image-compression";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { AuthContext } from "../../AuthProvider";
import Toast from "../../hooks/Toast";
import { storage } from "../../firebase/firebase.config";

const Register = () => {
	const { signUp, updateProfileInfo } = useContext(AuthContext);
	const [activeInput, setActiveInput] = useState("");
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const navigate = useNavigate();

	const handleFocus = (e) => {
		setActiveInput(e.target.name);
	};

	const handleBlur = () => {
		setActiveInput("");
	};

	const handleSignUp = async (event) => {
		showToast("loading", "Pleases Wait!");
		event.preventDefault();

		const form = event.target;
		const image = form.image.files[0];
		const name = form.name.value;
		const email = form.email.value;
		const password = form.password.value;

		if (!image) {
			return showToast("error", "Pleases upload an image");
		}

		if (password.length < 8) {
			return showToast(
				"error",
				"Password must be at least 8 characters!"
			);
		}

		const options = {
			maxSizeMB: 0.06,
			maxWidthOrHeight: 800,
			useWebWorker: true,
		};
		const compressedImage = await imageCompression(image, options);
		const blob = await imageCompression.getFilefromDataUrl(
			await imageCompression.getDataUrlFromFile(compressedImage),
			image.type
		);

		try {
			const res = await signUp(email, password);
			if (res.user) {
				const storageRef = ref(storage, email);
				const uploadTask = uploadBytesResumable(storageRef, blob);

				uploadTask.on(
					"state_changed",
					(snapshot) => {
						console.log(
							"Upload is " +
								(snapshot.bytesTransferred /
									snapshot.totalBytes) *
									100 +
								"% done"
						);
					},
					(error) => {
						console.log(error.message);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(
							(downloadURL) => {
								const userDocument = {
									photo: downloadURL,
									name: name,
									email: email,
								};
								updateProfileInfo(name, downloadURL);

								axios
									.post(
										"http://localhost:2000/users",
										userDocument
									)
									.then((response) => {
										if (
											response.data.acknowledged === true
										) {
											showToast(
												"success",
												"Registration successful!"
											);

											form.reset();
											setTimeout(() => {
												showToast(
													"loading",
													"Redirecting"
												);
												setTimeout(() => {
													navigate("/");
												}, 500);
											}, 1000);
										}
									})
									.catch((error) => {
										showToast(
											"error",
											"Couldn't store data to database!"
										);
									});
							}
						);
					}
				);
			} else {
				showToast("error", "Error registering user!");
			}
		} catch (error) {
			showToast("error", "Error registering user!");
		}

		// signUp(email, password)
		// 	.then((res) => {
		// 		if (res.user) {
		// 			const storageRef = ref(storage, email);
		// 			const uploadTask = uploadBytesResumable(storageRef, blob);

		// 			uploadTask.on(
		// 				"state_changed",
		// 				(snapshot) => {
		// 					console.log(
		// 						"Upload is " +
		// 							(snapshot.bytesTransferred /
		// 								snapshot.totalBytes) *
		// 								100 +
		// 							"% done"
		// 					);
		// 				},
		// 				(error) => {
		// 					console.log(error.message);
		// 				},
		// 				() => {
		// 					getDownloadURL(uploadTask.snapshot.ref).then(
		// 						(downloadURL) => {
		// 							const userDocument = {
		// 								photo: downloadURL,
		// 								name: name,
		// 								email: email,
		// 							};
		// 							updateProfileInfo(name, downloadURL);

		// 							axios
		// 								.post(
		// 									"http://localhost:2000/users",
		// 									userDocument
		// 								)
		// 								.then((response) => {
		// 									if (
		// 										response.data.acknowledged ===
		// 										true
		// 									) {
		// 										showToast(
		// 											"success",
		// 											"Registration successful!"
		// 										);

		// 										form.reset();
		// 									}
		// 								})
		// 								.catch((error) => {
		// 									showToast(
		// 										"error",
		// 										"Couldn't store data to database!"
		// 									);
		// 								});
		// 						}
		// 					);
		// 				}
		// 			);
		// 		} else {
		// 			showToast("error", "Error singing in user!");
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		showToast("error", "Error singing in user!");
		// 	});
	};

	const [selectedFile, setSelectedFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const handleChange = (event) => {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			setSelectedFile(file);
			const imageUrl = URL.createObjectURL(file);
			setImagePreview(imageUrl);
		}
	};

	const [showPassword, setShowPassword] = useState(false);
	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="flex items-center justify-center w-full max-h-screen p-10 bg-gradient-to-r from-amber-500 to-amber-600">
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}
			<div className="w-full">
				<div className="relative w-1/2 pt-8 mx-auto shadow-2xl rounded-xl bg-amber-50 drop-shadow-md">
					<form
						onSubmit={handleSignUp}
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
									<User />
								</span>
								<h1 className="">Register</h1>
							</div>

							<div
								className="bg-[#cacaca88] w-4/5"
								style={{
									borderLeft:
										activeInput === "name"
											? "3px solid #fab07a"
											: "",
									paddingLeft:
										activeInput === "name" ? "7px" : "",
								}}
								onFocus={handleFocus}
								onBlur={handleBlur}
								id="parag"
								tabIndex={1}
							>
								<p className="text-sm font-medium text-gray-500">
									Your Name
								</p>
								<input
									type="text"
									id="inputForm"
									name="name"
									required
								/>
							</div>

							<div
								className="bg-[#cacaca88] w-4/5"
								style={{
									borderLeft:
										activeInput === "image"
											? "3px solid #fab07a"
											: "",
									paddingLeft:
										activeInput === "image" ? "7px" : "",
								}}
								onFocus={handleFocus}
								onBlur={handleBlur}
								id="parag"
								tabIndex={1}
							>
								<p className="text-sm font-medium text-gray-500">
									Your Photo
								</p>

								{selectedFile ? (
									<label
										htmlFor="inputFormPic"
										className="flex gap-2 text-gray-300 cursor-pointer"
									>
										{imagePreview && (
											<img
												id="preview-image"
												src={imagePreview}
												alt="Image preview"
												className="object-cover rounded-full w-7 h-7"
											/>
										)}
										{selectedFile.name.length > 25
											? `${selectedFile.name.slice(
													0,
													25
											  )}...`
											: selectedFile.name}
									</label>
								) : (
									<label
										htmlFor="inputFormPic"
										className="flex items-center justify-start text-gray-700 cursor-pointer gap-x-2"
									>
										<ImagePlus /> Upload photo
									</label>
								)}
								<input
									type="file"
									id="inputFormPic"
									name="image"
									accept="image/*"
									onChange={handleChange}
									style={{ display: "none" }}
								/>
							</div>

							<div
								className="bg-[#cacaca88] w-4/5"
								style={{
									borderLeft:
										activeInput === "email"
											? "3px solid #fab07a"
											: "",
									paddingLeft:
										activeInput === "email" ? "7px" : "",
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
										activeInput === "password" ? "7px" : "",
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
											showPassword ? "text" : "password"
										}
									/>

									<button
										type="button"
										onClick={handleTogglePassword}
										className="text-gray-700 outline-none"
									>
										{showPassword ? <EyeOff /> : <Eye />}
									</button>
								</div>
							</div>

							<input
								type="submit"
								value="Register"
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
								Already a member?
							</p>
							<Link
								className="font-semibold duration-150 text-amber-700 hover:underline hover:text-amber-600"
								to="/login"
							>
								Login
							</Link>
						</div>
					</Fade>
				</div>
			</div>
		</div>
	);
};

export default Register;
