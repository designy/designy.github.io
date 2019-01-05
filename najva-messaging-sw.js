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
    event.notification.close();
    event.notification.clicked = true;
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

self.addEventListener('notificationclose', function (event) {
    var p = new Promise(function (resolve, reject) {
        if (event.notification.clicked) {
            resolve('ok');
        }
    });
    event.waitUntil(p);
    event.notification.close();
});


/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

/** @fileoverview
 This file is an example implementation for a service worker compatible with
 amp-web-push. This means the service worker accepts window messages (listened
 to via the service worker's 'message' handler), performs some action, and
 replies with a result.

 The service worker listens to postMessage() messages sent from a lightweight
 invisible iframe on the canonical origin. The AMP page sends messages to this
 "helper" iframe, which then forwards the message to the service worker.
 Broadcast replies from the service worker are received by the helper iframe,
 which broadcasts the reply back to the AMP page.
 */

/** @enum {string} */
const WorkerMessengerCommand = {
    /*
      Used to request the current subscription state.
     */
    AMP_SUBSCRIPION_STATE: 'amp-web-push-subscription-state',
    /*
      Used to request the service worker to subscribe the user to push.
      Notification permissions are already granted at this point.
     */
    AMP_SUBSCRIBE: 'amp-web-push-subscribe',
    /*
      Used to unsusbcribe the user from push.
     */
    AMP_UNSUBSCRIBE: 'amp-web-push-unsubscribe',
};

/*
  According to
  https://w3c.github.io/ServiceWorker/#run-service-worker-algorithm:

  "user agents are encouraged to show a warning that the event listeners
  must be added on the very first evaluation of the worker script."

  We have to register our event handler statically (not within an
  asynchronous method) so that the browser can optimize not waking up the
  service worker for events that aren't known for sure to be listened for.

  Also see: https://github.com/w3c/ServiceWorker/issues/1156
*/
self.addEventListener('message', event => {
    /*
      Messages sent from amp-web-push have the format:

      - command: A string describing the message topic (e.g.
        'amp-web-push-subscribe')

      - payload: An optional JavaScript object containing extra data relevant to
        the command.
     */
    const { command } = event.data;

    switch (command) {
        case WorkerMessengerCommand.AMP_SUBSCRIPION_STATE:
            onMessageReceivedSubscriptionState();
            break;
        case WorkerMessengerCommand.AMP_SUBSCRIBE:
            onMessageReceivedSubscribe();
            break;
        case WorkerMessengerCommand.AMP_UNSUBSCRIBE:
            onMessageReceivedUnsubscribe();
            break;
    }
});

/**
 Broadcasts a single boolean describing whether the user is subscribed.
 */
function onMessageReceivedSubscriptionState() {
    let retrievedPushSubscription = null;
    self.registration.pushManager.getSubscription()
        .then(pushSubscription => {
            retrievedPushSubscription = pushSubscription;
            if (!pushSubscription) {
                return null;
            } else {
                return self.registration.pushManager.permissionState(
                    pushSubscription.options
                );
            }
        }).then(permissionStateOrNull => {
        if (permissionStateOrNull == null) {
            broadcastReply(WorkerMessengerCommand.AMP_SUBSCRIPION_STATE, false);
        } else {
            const isSubscribed = !!retrievedPushSubscription &&
                permissionStateOrNull === 'granted';
            broadcastReply(WorkerMessengerCommand.AMP_SUBSCRIPION_STATE,
                isSubscribed);
        }
    });
}

/**
 Subscribes the visitor to push.

 The broadcast value is null (not used in the AMP page).
 */
function onMessageReceivedSubscribe() {
    /*
      If you're integrating amp-web-push with an existing service worker, use your
      existing subscription code. The subscribe() call below is only present to
      demonstrate its proper location. The 'fake-demo-key' value will not work.

      If you're setting up your own service worker, you'll need to:
        - Generate a VAPID key (see:
          https://developers.google.com/web/updates/2016/07/web-push-interop-wins)
        - Using urlBase64ToUint8Array() from
          https://github.com/web-push-libs/web-push, convert the VAPID key to a
          UInt8 array and supply it to applicationServerKey
     */
    const najvaSettings = {
        campaign_id: "673",
        without_popup: false,
        with_popup: true,
        api_key: "33b205837e294262bb3a3955a9b0f906",
        najva_subdomain: "https://aliii153.najva.com/",
        website_id: "167",
        location_permission: true,
        request_text: "آیا میخواهید پربازدیدترین موضوعات برای شما ارسال شود؟",
        request_description: "تخفیف‌ها، آموزش ها و جدیدترین اخبار",
        accept_text: "بله",
        denied_text: "خیر",
        request_icon: "http://127.0.0.1:8009/static/media/upload/request_icon/240_F_188168883_DIrtPjMyDWWlsKBt3plSc1zHhO3VIOcM_sekxjbN.jpg",


        dismiss_cookie_days: 3,
        request_permission: {
            delay: {
                enable: 1,
                value: 1,
            },
            scroll: {
                enable: 0,
                value: 50,
            },
            visit: {
                minimum: {
                    enable: 1,
                    value: 2,
                },
                maximum: {
                    enable: 0,
                    value: 24,
                },
                interval: {
                    enable: 0,
                    value: 3,
                },
            },
        },
        show_bell: 1,
        show_bell_in_mobile: 1,
        bell_direction: "right",
        tooltip_direction: "right",
        bell_color_hover: "#7a1002",
        bell_color: "#35c91b",
        bell_tooltip: "مشترک شوید",
    };

    function sendTokenToServer(token) {
        var url = "https://app.najva.com/api/v1/add/";
        var data = {"token_id" : token ,"topic" : najvaSettings.campaign_id, "website_id" : najvaSettings.website_id, "api_key" : najvaSettings.api_key};
        fetch(url + params,

            {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
                body: JSON.stringify(data), // body data type must match "Content-Type" header
                credentials: "include"
            }).then(function (r) {
            console.log(r)
        });
    }

    messaging.getToken()
        .then(currentToken => {
            sendTokenToServer(currentToken);
            broadcastReply(WorkerMessengerCommand.AMP_SUBSCRIBE, null);
        })
        .catch(err => {
            console.error(err);
        });
    // self.registration.pushManager.subscribe({
    //   userVisibleOnly: true,
    //   applicationServerKey: 'fake-demo-key',
    // }).then(() => {
    //   // IMPLEMENT: Forward the push subscription to your server here
    //   broadcastReply(WorkerMessengerCommand.AMP_SUBSCRIBE, null);
    // });
}


/**
 Unsubscribes the subscriber from push.

 The broadcast value is null (not used in the AMP page).
 */
function onMessageReceivedUnsubscribe() {
    self.registration.pushManager.getSubscription()
        .then(subscription => subscription.unsubscribe())
        .then(() => {
            // OPTIONALLY IMPLEMENT: Forward the unsubscription to your server here
            broadcastReply(WorkerMessengerCommand.AMP_UNSUBSCRIBE, null);
        });
}

/**
 * Sends a postMessage() to all window frames the service worker controls.
 * @param {string} command
 * @param {!JsonObject} payload
 */
function broadcastReply(command, payload) {
    self.clients.matchAll()
        .then(clients => {
            for (let i = 0; i < clients.length; i++) {
                const client = clients[i];
                client./*OK*/postMessage({
                    command,
                    payload,
                });
            }
        });
}

