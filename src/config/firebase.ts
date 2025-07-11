import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQYUOdVpHagr3WdXAw8blgyBi9oyk6J3U",
  authDomain: "shopping-list-app-90827.firebaseapp.com",
  projectId: "shopping-list-app-90827",
  storageBucket: "shopping-list-app-90827.firebasestorage.app",
  messagingSenderId: "169847957305",
  appId: "1:169847957305:web:1df611d5abcb1543d7aae8",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
