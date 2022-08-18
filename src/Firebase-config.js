import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBBGpOJ856pwvIlp8UO04bhTqee9swhdUE",
  authDomain: "pokeapp-a5315.firebaseapp.com",
  projectId: "pokeapp-a5315",
  storageBucket: "pokeapp-a5315.appspot.com",
  messagingSenderId: "102358886362",
  appId: "1:102358886362:web:f84bd0b60feadfac3c42e3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
