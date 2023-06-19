import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDcLAT3TyCxxkfbjmBud4a0rPVSfqdtkKc",
  authDomain: "video-49926.firebaseapp.com",
  projectId: "video-49926",
  storageBucket: "video-49926.appspot.com",
  messagingSenderId: "1070681956639",
  appId: "1:1070681956639:web:2419ce51a6b7ad4290102a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider();

export default app;