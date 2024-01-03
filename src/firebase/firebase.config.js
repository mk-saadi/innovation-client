import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBIHmAMFBiOn7yUwMANEcUIwRYT9YdKWjE",
	authDomain: "universal-008.firebaseapp.com",
	projectId: "universal-008",
	storageBucket: "universal-008.appspot.com",
	messagingSenderId: "889065551414",
	appId: "1:889065551414:web:73add80e4cd138e1b0ca97",
};

const app = initializeApp(firebaseConfig);

export default app;
export const storage = getStorage();
