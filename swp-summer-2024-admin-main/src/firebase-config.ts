import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCz9uAaNhbIXLO3K9cheRaNc8YxRBgGGvE",
  authDomain: "vintagetimepiece-chat.firebaseapp.com",
  projectId: "vintagetimepiece-chat",
  storageBucket: "vintagetimepiece-chat.appspot.com",
  messagingSenderId: "736819607983",
  appId: "1:736819607983:web:c60bec673393b72f6cd75a",
  measurementId: "G-9T07QHBEYG",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const imageDb = getStorage(app);
