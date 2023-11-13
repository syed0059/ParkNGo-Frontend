const notificationManager = require('../notificationManager/notificationManager');

module.exports.getNotificationList = async () => {
    return await notificationManager.getNotificationList();
}

module.exports.attach = async (carparkId) => {
    await notificationManager.addToNotificationList(carparkId);
}

module.exports.detach = async (carparkId) => {
    await notificationManager.removeFromNotificationList(carparkId);
}