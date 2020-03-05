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

messaging.setBackgroundMessageHandler(function(payload) {
    const data = payload.data;
    const notificationOptions = {body: data.body, tag: data.messageId};
    const notify = new Notification(data.title,notificationOptions);
    if(data.link) {
        notify.onclick = () => {
            setStatus(data.messageId, "LINK");
            window.open(data.link);
        }
    }
    notify.onshow = () => setStatus(data.messageId, "SHOW");
    notify.onerror = (event) => setStatus(data.messageId, "ERROR", JSON.stringify(event));
});

function setStatus(id, status, error) {
    console.log('Отправка статуса ' + status + " ");
    $.ajax(setStatusUrl, {
        type: 'POST',
        contentType: 'application/json',
        dataType: 'text',
        data: {messageCode:id, state: status, errorMessage: error},
        success: function () {
            console.log('Статус успешно отправлен')
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.error('Статус не отправлен: ' + errorMessage);
        }
    })
}

self.addEventListener('push', function(e) {
    var i = 0;
}