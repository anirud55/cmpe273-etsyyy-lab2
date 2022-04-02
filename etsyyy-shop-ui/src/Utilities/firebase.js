import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyM3grhAcEvU43i0kl2jFErmX5PiPzJwI",
  authDomain: "etsyyy-e90cc.firebaseapp.com",
  projectId: "etsyyy-e90cc",
  storageBucket: "etsyyy-e90cc.appspot.com",
  messagingSenderId: "984442864201",
  appId: "1:984442864201:web:1330c9681ad7ac31473598",
  measurementId: "G-NRSP6KXT6C"
};

const app = initializeApp(firebaseConfig);

export const storage_bucket = getStorage(app);
