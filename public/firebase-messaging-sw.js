importScripts('https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: "AIzaSyAtJWz7IMbcsh65wvTJsr7xzsmpIMDD-Ao",
  authDomain: "bunout-2ed63.firebaseapp.com",
  projectId: "bunout-2ed63",
  storageBucket: "bunout-2ed63.appspot.com",
  messagingSenderId: "1064933370265",
  appId: "1:1064933370265:web:3251f0d0af4f04fb170b08",
  measurementId: "G-ZMM294BFWY"
};

// Firebase 앱 초기화
firebase.initializeApp(firebaseConfig);

// 메시징 객체 가져오기
const messaging = firebase.messaging();

// 백그라운드 메시지 처리
// messaging.onBackgroundMessage((payload) => {
//   console.log('Received background message ', payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: '/images/icons/aos.png'
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
self.addEventListener('push', function (event) {
  if (event.data) {
    const {
      data: { title, body, link },
    } = event.data.json();

    const options = {
      body,
      data: {
        link,
      },
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } else {
    console.log('푸시 이벤트 데이터가 없습니다.');
  }
});