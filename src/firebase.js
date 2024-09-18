// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken} from 'firebase/messaging';
const firebaseConfig = {
    apiKey: "AIzaSyDFDeWiSEbnfiZBStTYuIi2rf0Jc45RSQg",
    authDomain: "bunout-6fab2.firebaseapp.com",
    projectId: "bunout-6fab2",
    storageBucket: "bunout-6fab2.appspot.com",
    messagingSenderId: "111594277875",
    appId: "1:111594277875:web:dd8f37f8e9d083f144a086",
    measurementId: "G-87RHEJHXQ1"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
export { messaging, getToken };
