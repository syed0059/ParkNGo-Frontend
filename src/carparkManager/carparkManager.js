import AsyncStorage from '@react-native-async-storage/async-storage';
/*
async function clearAllLocalData() {
    try {
        await AsyncStorage.clear();
        console.log('Local data cleared!');
    } catch (e) {
        console.error('Failed to clear local data:', e);
    }
}
clearAllLocalData(); */

// Change this to your own ip address
const localhost = 'http://192.168.0.100';

initialiseCarparks = async () => {
    console.log('initialising');
    let carparks;
    try {
        carparks = await fetch(localhost + ':3000/search/all');
        carparks = await carparks.json();

        for (const carpark of carparks) {
            await AsyncStorage.setItem(carpark['CarparkID'], JSON.stringify(carpark));
        }
        await AsyncStorage.setItem('initialised', 'true');
    } catch (e) {
        console.error(e);
    }
}

module.exports.getAllCarparks = async () => {
    const initialised = await AsyncStorage.getItem('initialised');

    if (!initialised) {
        await initialiseCarparks();
    }

    const keys = await AsyncStorage.getAllKeys();

    const carparks =  await AsyncStorage.multiGet(keys.filter(key => {
        return key !== 'initialised';
    }));

    const res = new Object();

    for (const carpark of carparks) {
        res[carpark[0]] = await JSON.parse(carpark[1]);
    }

    return res;
}

module.exports.getCarparkById = async (carparkId) => {
    const initialised = await AsyncStorage.getItem('initialised');

    if (!initialised) {
        await initialiseCarparks();
    }

    const carpark = await AsyncStorage.getItem(carparkId);

    return await JSON.parse(carpark);
}

module.exports.getCarparksByIdArray = async (carparkIdsArray) => {
    const initialised = await AsyncStorage.getItem('initialised');

    if (!initialised) {
        await initialiseCarparks();
    }

    const carparks =  await AsyncStorage.multiGet(carparkIdsArray);

    const res = new Object();

    for (const carpark of carparks) {
        res[carpark[0]] = await JSON.parse(carpark[1]);
    }

    return res;
}

module.exports.getCarparksByLocation = async (coordinates, radius) => {
    const response = await fetch(localhost + ':3000/search/nearby?' + new URLSearchParams({
        'longitude': coordinates['Long'],
        'latitude': coordinates['Lat'],
        radius
    }))

    return await response.json();
}

module.exports.addToFavourites = async (carparkId) => {
    let prevFavourites = await AsyncStorage.getItem('favourites')
    prevFavourites = prevFavourites ? await JSON.parse(prevFavourites) : [];

    if (prevFavourites.findIndex(id => {
        return parseInt(id) === carparkId
    }) !== -1) {
        return;
    }

    await AsyncStorage.setItem('favourites', JSON.stringify([...prevFavourites, carparkId]));
}

module.exports.removeFromFavourites = async (carparkId) => {
    let prevFavourites = await AsyncStorage.getItem('favourites')
    prevFavourites = prevFavourites ? await JSON.parse(prevFavourites) : [];

    await AsyncStorage.setItem('favourites', JSON.stringify(prevFavourites.filter(id => {
        return id !== carparkId;
    })))
}

module.exports.getFavourites = async () => {
    let favourites = await AsyncStorage.getItem('favourites');
    favourites = favourites ? await JSON.parse(favourites) : []
    return favourites;
}