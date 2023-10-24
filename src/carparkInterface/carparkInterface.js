const carparkManager = require('../carparkManager/carparkManager');

module.exports.getAllCarparks = async () => {
    return await carparkManager.getAllCarparks();
}

module.exports.getCarparkById = async (carparkId) => {
    return await carparkManager.getCarparkById(carparkId);
}

module.exports.getCarparksByIdArray = async (carparkIdArray) => {
    return await carparkManager.getCarparksByIdArray(carparkIdArray);
}

module.exports.getFavourites = async () => {
    return await carparkManager.getFavourites();
}

module.exports.addToFavourites = async (carparkId) => {
    await carparkManager.addToFavourites(carparkId);
}

module.exports.removeFromFavourites = async (carparkId) => {
    await carparkManager.removeFromFavourites(carparkId);
}

module.exports.getCarparksByLocation = async (coordinates, radius) => {
    return await carparkManager.getCarparksByLocation(coordinates, radius);
}