import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyAfFECCfso2NhnO4cT3i4k7vMdrGDD8MDk",
  authDomain: "fitness-4c7c2.firebaseapp.com",
  projectId: "fitness-4c7c2",
  storageBucket: "fitness-4c7c2.appspot.com",
  messagingSenderId: "374278895030",
  appId: "1:374278895030:web:1a94e4b8215f491f9e3d17"
};

firebase.initializeApp(firebaseConfig);
const storageRef = firebase.storage().ref();
export {};
export default firebase;
