importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
var firebaseConfig = {
    apiKey: "AIzaSyCwEuRSi7eAFHNMuC-6Kh1Z7pIHzkcPGwY",
    authDomain: "test-vapid.firebaseapp.com",
    projectId: "test-vapid",
    storageBucket: "test-vapid.appspot.com",
    messagingSenderId: "231440941704",
    appId: "1:231440941704:web:69ed5eccc8efd41bf3d53d"
  };
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    debugger
    console.log(payload)
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});