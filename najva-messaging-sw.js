var today = new Date();
var todayString = "?v=" + today.getFullYear() + ("0" + today.getMonth()).slice(-2) + ("0" + today.getUTCDate()).slice(-2);
importScripts('https://app.najva.com/static/cdn/https_worker/najva-messaging-sw.v2.js' + todayString);
