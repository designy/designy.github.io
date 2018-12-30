importScripts('https://app.najva.com/static/cdn/najva-app/najva-app.js');
importScripts('https://app.najva.com/static/cdn/najva-app/najva-messaging.js');

// configuration

var config = {
    messagingSenderId: "334645784830"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    // console.log(payload);
    console.log("setback handlers")
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
            current_notification.onclick = function (ev) {
                console.log("set bak click handler")
            }
            console.log(current_notification);
            console.log(expireTime);
            if (expireTime > 0) {
                setTimeout(function () {
                    console.log("closed by expire")
                    current_notification.close()
                }, expireTime);
            }
        });
    });

    return notificationPromise;
});


// self.addEventListener('notificationclick', function(event) {
//     console.log('On notification click: ', event.notification);
//     event.notification.close();
// event.waitUntil(
//     clients.matchAll({
//         type: "window"
//     })
//         .then(function(clientList) {
//             console.log("here")
//             var url = "";
//             console.log("complete url is:" + event.notification.data.complete_url);
//             if (event.notification.data.complete_url) {
//                 console.log("in if")
//                 url = event.notification.data.complete_url
//             }
//             else {
//                 console.log("in else")
//                 url = "https://click.najva.com/redirect/?notification_id=" + event.notification.data.notification_id;
//                 url += '&website_id=' + event.notification.data.website_id;
//                 url += '&api_key=' + event.notification.data.api_key;
//                 url += "&next=" + event.notification.data.url;
//             }
//
//             for (var i = 0; i < clientList.length; i++) {
//                 var client = clientList[i];
//                 if (client.url === url && 'focus' in client)
//                     return client.focus();
//             }
//             if (clients.openWindow) {
//                 return clients.openWindow(url);
//             }
//         })
// );
// });

self.addEventListener('notificationclick', function (event) {
    console.log("click handler")
    event.waitUntil(
        self.clients.matchAll().then(function (clientList) {
            console.log(clientList);
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return self.clients.openWindow('https://google.com');
        })
    );
});


self.addEventListener('notificationclose', function (event) {
    console.log('On notification close: ', event.notification);
    // event.notification.onclick = function (ev) {
    //     console.log("after close clicked")
    // };
    event.waitUntil(
        self.clients.matchAll().then(function (clientList) {
            event.notification.onclick = function (ev) {
                console.log("close click handler")
            }
        }))

    event.notification.close();

    // event.waitUntil(
    //     clients.matchAll({
    //         type: "window"
    //     })
    //     .then(function(clientList) {
    //         if (event.notification.data.notification_id){
    //         var id = event.notification.data.notification_id;
    //         var url = "https://app.najva.com/api/v1/notification/closed?notification_id=" + id;
    //         url += '&website_id=' + event.notification.data.website_id;
    //         url += '&api_key=' + event.notification.data.api_key;
    //         fetch(url, {
    //             credentials: "include"
    //         });
    //         }
    //     })
    // );
});

