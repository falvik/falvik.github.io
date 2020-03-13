// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js');

const host = "https://compath-callback.sportmaster.ru";
const setStatusUrl = host + "/test/web-push-status";

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

messaging.setBackgroundMessageHandler(function (payload) {
    const data = payload.data;
    const notificationOptions = {body: data.body, tag: data.messageId, data: data};
    return self.registration.showNotification(data.title, notificationOptions)
        .then(() => setStatus(data.messageId, "SHOW"))
        .catch((event) => setStatus(data.messageId, "ERROR", JSON.stringify(event)))
});

self.addEventListener('notificationclick', function (event) {
    var data = event.notification.data
    if (link) {
        setStatus(data.messageId, "LINK");
        clients.openWindow(data.link)
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