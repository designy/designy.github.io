importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

// configuration

var config = {
    apiKey: "AIzaSyDlgao6nGaw7RsZgjskbXsIhl0mwhOjZz4",
    messagingSenderId: "334645784830"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(payload);

    const notificationTitle = payload.data.title;

    var expireTime = parseInt(payload.data.expireTime);

    const notificationOptions = {
        body : payload.data.body,
        icon : payload.data.icon,
        image : payload.data.image,
        requireInteraction : true,
        data : payload.data
    };

    var notificationPromise = self.registration.showNotification(notificationTitle,
        notificationOptions);

    notificationPromise.then(function(){
        registration.getNotifications().then(function(notifications){
            var current_notification = notifications[notifications.length - 1];
            console.log(current_notification);
            if(expireTime > 0)
            {
                setTimeout(function() {
                    current_notification.close()
                },expireTime);
            }
        });
    });

    return notificationPromise;
});


self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event.notification);
    event.notification.close();

    event.waitUntil(
        clients.matchAll({
            type: "window"
        })
            .then(function(clientList) {
                var url = "{{ host_url }}" + "redirect/?notification_id=" + event.notification.data.notification_id;
                url += '&website_id=' + event.notification.data.website_id;
                url += '&api_key=' + event.notification.data.api_key;
                url += "&next=" + event.notification.data.url;

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

self.addEventListener('notificationclose', function(event) {
    console.log('On notification close: ', event.notification);
    // event.notification.close();

    event.waitUntil(
        clients.matchAll({
            type: "window"
        })
        .then(function(clientList) {
            var id = event.notification.data.notification_id;
            var url = "{{host_url}}api/v1/notification/closed?notification_id=" + id;
            url += '&website_id=' + event.notification.data.website_id;
            url += '&api_key=' + event.notification.data.api_key;

            fetch(url, {
                credentials: "include"
            });
        })
    );
});


