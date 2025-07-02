import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC85y6q5yxz_Sr1BfWcufx9UClkSEgOiFg",
    authDomain: "listamercadoapp-561d9.firebaseapp.com",
    projectId: "listamercadoapp-561d9",
    storageBucket: "listamercadoapp-561d9.firebasestorage.app",
    messagingSenderId: "1085189265318",
    appId: "1:1085189265318:web:f67a53d726e4efeb612167",
    measurementId: "G-C3RW7NT0J4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
