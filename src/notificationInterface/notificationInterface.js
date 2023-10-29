const notificationManager = require('../notificationManager/notificationManager');

module.exports.getNotificationList = async () => {
    return await notificationManager.getNotificationList();
}

module.exports.addToNotificationList = async (carparkId) => {
    await notificationManager.addToNotificationList(carparkId);
}

module.exports.removeFromNotificationList = async (carparkId) => {
    await notificationManager.removeFromNotificationList(carparkId);
}