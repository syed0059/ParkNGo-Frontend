export const sortByDistance = (carparks) => {
    return [...carparks].sort((a, b) => a.distance - b.distance);
  };
  
  export const sortByAvailability = (carparks) => {
    return [...carparks].sort((a, b) => (b.availability.car.availability + b.availability.motorcycle.availability) - ( a.availability.car.availability + a.availability.motorcycle.availability));
  };
  
  export const sortByPrice = (carparks) => {
    return [...carparks].sort((a, b) => {
      // Assign a high number for sorting URA and LTA types to the end
      const typePriority = {
        'URA Carpark': 2,
        'LTA Carpark': 2,
        // All other types will have a default priority of 1
        'default': 1 
      };
  
      const getPriority = (type) => typePriority[type] || typePriority['default'];
  
      // Compare the priorities to sort
      return getPriority(a.CarparkType) - getPriority(b.CarparkType);
    });
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
  