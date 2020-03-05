self.addEventListener('push', (push) => {
    const data = push.data.json().data;
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
})

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