import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyDzi3o1_XUfOG2w7jqOUXAH4VE9QLs2NTA",
  authDomain: "lama-1285f.firebaseapp.com",
  projectId: "lama-1285f",
  storageBucket: "lama-1285f.appspot.com",
  messagingSenderId: "737663715257",
  appId: "1:737663715257:web:7d238cdc8d7d2b101ed868",
  measurementId: "G-X4PCCL097Z"
};

firebase.initializeApp(firebaseConfig);
const storageRef = firebase.storage().ref();
export {};
export default firebase;
