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

messaging.onMessage((payload) => {
    var i = 0;
});