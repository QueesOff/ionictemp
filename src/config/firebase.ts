import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjiKKpuTKgxRbI4zRHbwZm3iAez8XOv9E",
  authDomain: "test12312313131.firebaseapp.com",
  projectId: "test12312313131",
  storageBucket: "test12312313131.appspot.com",
  messagingSenderId: "641998127209",
  appId: "1:641998127209:web:7c6ee4c0631795c389e2f8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
