import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationList = 'notificationList';

module.exports.addToNotificationList = async (carparkId) => {
    let prev = await AsyncStorage.getItem(NotificationList);
    prev = prev ? await JSON.parse(prev) : [];

    if (prev.findIndex(id => {
        return id === carparkId;
    }) !== -1) {
        return;
    }

    await AsyncStorage.setItem(NotificationList, JSON.stringify([...prev, carparkId]));
}

module.exports.getNotificationList = async () => {
    let notificationList = await AsyncStorage.getItem(NotificationList);
    notificationList = notificationList ? await JSON.parse(notificationList) : [];
    return notificationList;
}

module.exports.removeFromNotificationList = async (carparkId) => {
    let prev = await AsyncStorage.getItem(NotificationList);
    prev = prev ? await JSON.parse(prev) : [];

    await AsyncStorage.setItem(NotificationList, JSON.stringify(prev.filter(id => {
        return id !== carparkId;
    })))
}