import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUTIlbdRdYzxlM37bYI7hcHdWpte9LQyk",
  authDomain: "agro-chain-b60c6.firebaseapp.com",
  projectId: "agro-chain-b60c6",
  storageBucket: "agro-chain-b60c6.firebasestorage.app",
  messagingSenderId: "560241674955",
  appId: "1:560241674955:web:7bb9764c1963b3de4b694e",
  measurementId: "G-9MFLGH0TGL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();