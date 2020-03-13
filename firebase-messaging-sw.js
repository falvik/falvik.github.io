// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBh8Xq1A02Hjh10rDgoUK3YfbKOyLsdJVg",
    authDomain: "test-51e78.firebaseapp.com",
    databaseURL: "https://test-51e78.firebaseio.com",
    projectId: "test-51e78",
    storageBucket: "test-51e78.appspot.com",
    messagingSenderId: "493570643651",
    appId: "1:493570643651:web:cd564f697b8d081b17b476",
    measurementId: "G-LLFF9VTSRL"
});

const messaging = firebase.messaging();
const host = "https://compath-callback.sportmaster.ru";
const setStatusUrl = host + "/test/web-push-status";

messaging.setBackgroundMessageHandler(function (payload) {
    const data = payload.data;
    const notificationOptions = {body: data.body, tag: data.messageId, data: {link: data.link}};
    return self.registration.showNotification(data.title, notificationOptions)
        .then(() => setStatus(data.messageId, "SHOW"))
        .catch((event) => setStatus(data.messageId, "ERROR", JSON.stringify(event)))
});

self.addEventListener('notificationclick', function (event) {
    var link = event.notification.data.link
    if (link) {
        clients.openWindow(link)
    }
})

function setStatus(id, status, error) {
    console.log('Отправка статуса ' + status + " ");
    fetch(setStatusUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({messageCode: id, state: status, errorMessage: error})
    }).then(() => {
        console.log('Статус отправлен');
    })
}