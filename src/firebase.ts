import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAfFECCfso2NhnO4cT3i4k7vMdrGDD8MDk",
    authDomain: "fitness-4c7c2.firebaseapp.com",
    projectId: "fitness-4c7c2",
    storageBucket: "fitness-4c7c2.appspot.com",
    messagingSenderId: "374278895030",
    appId: "1:374278895030:web:8f154315b9492d739e3d17"
  };
firebase.initializeApp(firebaseConfig);

// Получение доступа к сервисам Firebase
const storage = firebase.storage();
const firestore = firebase.firestore();

export { storage, firestore };
