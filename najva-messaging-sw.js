importScripts('https://app.najva.com/static/cdn/najva-app/najva-app.js');
importScripts('https://app.najva.com/static/cdn/najva-app/najva-messaging.js');

// configuration

var config = {
    messagingSenderId: "334645784830"
};
firebase.initializeApp(config);

var messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);

    var notificationTitle = payload.data.title;

    var expireTime = parseInt(payload.data.expireTime);

    var notificationOptions = {
        body: payload.data.body,
        icon: payload.data.icon,
        image: payload.data.image,
        requireInteraction: true,
        data: payload.data
    };

    var notificationPromise = self.registration.showNotification(notificationTitle,
        notificationOptions);

    notificationPromise.then(function () {
        registration.getNotifications().then(function (notifications) {
            var current_notification = notifications[notifications.length - 1];
            console.log(current_notification);
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

    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        })
            .then(function (clientList) {
                var url = "";
                if (event.notification.data.complete_url) {
                    url = event.notification.data.complete_url
                }
                else {
                    url = "https://click.najva.com/redirect/?notification_id=" + event.notification.data.notification_id;
                    url += '&website_id=' + event.notification.data.website_id;
                    url += '&api_key=' + event.notification.data.api_key;
                    url += "&next=" + event.notification.data.url;
                }

                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if (client.url === url && 'focus' in client)
                        return client.focus();
                }
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
    );
});

// self.addEventListener('notificationclose', function (event) {
//     console.log('On notification close: ', event.notification);
//     event.notification.close();
//
//     event.waitUntil(
//         clients.matchAll({
//             type: "window",
//             includeUncontrolled: true
//         })
//             .then(function (clientList) {
//             })
//     );
// });
self.onnotificationclick = function (event) {
    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        })
            .then(function (clientList) {
                var url = "";
                if (event.notification.data.complete_url) {
                    url = event.notification.data.complete_url
                }
                else {
                    url = "https://click.najva.com/redirect/?notification_id=" + event.notification.data.notification_id;
                    url += '&website_id=' + event.notification.data.website_id;
                    url += '&api_key=' + event.notification.data.api_key;
                    url += "&next=" + event.notification.data.url;
                }

                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if (client.url === url && 'focus' in client)
                        return client.focus();
                }
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
    );
};

