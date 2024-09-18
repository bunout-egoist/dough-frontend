importScripts('https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js')

const firebaseConfig = {
    apiKey: "AIzaSyDFDeWiSEbnfiZBStTYuIi2rf0Jc45RSQg",
    authDomain: "bunout-6fab2.firebaseapp.com",
    projectId: "bunout-6fab2",
    storageBucket: "bunout-6fab2.appspot.com",
    messagingSenderId: "111594277875",
    appId: "1:111594277875:web:dd8f37f8e9d083f144a086",
    measurementId: "G-87RHEJHXQ1"
};

// Firebase 앱 초기화
firebase.initializeApp(firebaseConfig);

// 메시징 객체 가져오기
const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
