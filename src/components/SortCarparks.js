export const sortByDistance = (carparks) => {
    return [...carparks].sort((a, b) => a.distance - b.distance);
  };
  
  export const sortByAvailability = (carparks) => {
    return [...carparks].sort((a, b) => b.progress - a.progress);
  };
  
  export const sortByPrice = (carparks) => {
    return [...carparks].sort((a, b) => a.price - b.price);
  };
  
  export const sortCarparks = (carparks, sortOption) => {
    switch (sortOption) {
      case 'distance':
        return sortByDistance(carparks);
      case 'availability':
        return sortByAvailability(carparks);
      case 'price':
        return sortByPrice(carparks);
      default:
        return carparks;
    }
  };
  