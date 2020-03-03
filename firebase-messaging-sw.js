// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: '493570643651'
});

const messaging = firebase.messaging();

messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
});