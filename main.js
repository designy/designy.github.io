const urlB64ToUint8Array = base64String => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
var firebaseConfig = {
    apiKey: "AIzaSyCwEuRSi7eAFHNMuC-6Kh1Z7pIHzkcPGwY",
    authDomain: "test-vapid.firebaseapp.com",
    projectId: "test-vapid",
    storageBucket: "test-vapid.appspot.com",
    messagingSenderId: "231440941704",
    appId: "1:231440941704:web:69ed5eccc8efd41bf3d53d"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const publicKey = 'BBpROl4GVrcjy8CYW4qD_ThWFq-m29qKS8ctWqUH5GHjpuqnQHA_UQhYXR-Ucb0vlmLUKxlBwmSDbUsxB-86YxM';
const messaging = firebase.messaging();

function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(reg) {

      reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey
      }).then(function(sub) {
      console.log(JSON.stringify(sub))
        console.log('Endpoint URL: ', sub.endpoint);
      }).catch(function(e) {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Unable to subscribe to push', e);
        }
      });
    })
  }
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(registration) {
    console.log('Service Worker Registered!', registration);
    messaging.useServiceWorker(registration)
  messaging
    .getToken({
      serviceWorkerRegistration: registration,
      vapidKey: publicKey,
      userVisibleOnly: true,

    })
    .then((token) => {
      console.log(token);
      subscribeUser()
    });
  messaging.onMessage((payload) => {
    return registration.showNotification(payload.notification.title, {
      body: payload.notification.body + " forground-message",
      requireInteraction: true,
    });
  });

    // reg.pushManager.getSubscription().then(function(sub) {
    //   if (sub === null) {
    //     // Update UI to ask user to register for Push
    //     console.log('Not subscribed to push service!');
    //     subscribeUser()
    //   } else {
    //     // We have a subscription, update the database
    //     console.log('Subscription object: ', sub);
    //   }
    // });
  })
   .catch(function(err) {
    console.log('Service Worker registration failed: ', err);
  });
}
