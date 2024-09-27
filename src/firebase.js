// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken} from 'firebase/messaging';
const firebaseConfig = {
    apiKey: "AIzaSyAtJWz7IMbcsh65wvTJsr7xzsmpIMDD-Ao",
    authDomain: "bunout-2ed63.firebaseapp.com",
    projectId: "bunout-2ed63",
    storageBucket: "bunout-2ed63.appspot.com",
    messagingSenderId: "1064933370265",
    appId: "1:1064933370265:web:3251f0d0af4f04fb170b08",
    measurementId: "G-ZMM294BFWY"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
export { messaging, getToken };
