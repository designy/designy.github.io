importScripts('https://app.najva.com/static/cdn/najva-app/najva-app.js');
importScripts('https://app.najva.com/static/cdn/najva-app/najva-messaging.js');

// configuration

var config = {
    messagingSenderId: "334645784830"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    console.log("in set backgroundHandler")
    const notificationTitle = payload.data.title;

    var expireTime = parseInt(payload.data.expireTime);

    const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.icon,
        image: payload.data.image,
        requireInteraction: true,
        data: payload.data,
    };

    var notificationPromise = self.registration.showNotification(notificationTitle,
        notificationOptions);

    notificationPromise.then(function () {
        registration.getNotifications().then(function (notifications) {
            var current_notification = notifications[notifications.length - 1];
            console.log(current_notification);
            current_notification.onclick = function (ev) {
                var url = 'https://click.najva.com/redirect/?notification_id='
                window.open(url, '_bl');
            };
            if (expireTime > 0) {
                setTimeout(function () {
                    current_notification.close()
                }, expireTime);
            }
        });
    });

    return notificationPromise;
});


self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification);
    event.notification.close();
    var url = "";
    console.log("complete url is:" + event.notification.data.complete_url);
    if (event.notification.data.complete_url) {
        url = event.notification.data.complete_url
    }
    else {
        url = "https://click.najva.com/redirect/?notification_id=" + event.notification.data.notification_id;
        url += '&website_id=' + event.notification.data.website_id;
        url += '&api_key=' + event.notification.data.api_key;
        url += "&next=" + event.notification.data.url;
    }
    // Check if it exists
    if (url) {
        // Open the target URL in a new tab/window
        event.waitUntil(clients.openWindow(url));
    }
});

// self.addEventListener('notificationclose', function (event) {
//     console.log('On notification close: ', event.notification);
//     // event.notification.close();
//
//     event.waitUntil(
//         clients.matchAll({
//             type: "window",
//             includeUncontrolled: true
//         })
//             .then(function (clientList) {
//                 event.notification.onclick = function (ev) {
//                     var url = "";
//                     console.log("complete url is:" + event.notification.data.complete_url);
//                     if (event.notification.data.complete_url) {
//                         url = event.notification.data.complete_url
//                     }
//                     else {
//                         url = "https://click.najva.com/redirect/?notification_id=" + event.notification.data.notification_id;
//                         url += '&website_id=' + event.notification.data.website_id;
//                         url += '&api_key=' + event.notification.data.api_key;
//                         url += "&next=" + event.notification.data.url;
//                     }
//
//                     for (var i = 0; i < clientList.length; i++) {
//                         var client = clientList[i];
//                         if (client.url === url && 'focus' in client)
//                             return client.focus();
//                     }
//                     if (clients.openWindow) {
//                         return clients.openWindow(url);
//                     }
//                 };
//                 if (event.notification.data.notification_id) {
//                     var id = event.notification.data.notification_id;
//                     var url = "https://app.najva.com/api/v1/notification/closed?notification_id=" + id;
//                     url += '&website_id=' + event.notification.data.website_id;
//                     url += '&api_key=' + event.notification.data.api_key;
//                     fetch(url, {
//                         credentials: "include"
//                     });
//                 }
//             })
//     );
// });

self.onnotificationclick = function (event) {
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
        includeUncontrolled: true
    }).then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == 'http://google.com' && 'focus' in client)
                return client.focus();
        }
        if (clients.openWindow)
            return clients.openWindow('http://google.com');
    }));
};