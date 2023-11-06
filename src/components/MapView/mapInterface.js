export function getCarparks(carparks){
    let data = []

    const carparkArray = Object.values(carparks);

    for (let i = 0; i < carparkArray.length; i++) {

      let avail = carparkArray[i].availability.motorcycle.availability + carparkArray[i].availability.car.availability
      let total = carparkArray[i].availability.motorcycle.total + carparkArray[i].availability.car.total
      let percent = (avail/total) * 100
      if(avail==-2 && total ==-2){
        percent=0;
      }
      const newCarparkInfo = {
        title: carparkArray[i].Address,
        location: {
          latitude: carparkArray[i].Coordinates.coordinates[1],
          longitude: carparkArray[i].Coordinates.coordinates[0],
        },
        description: "Carpark",
        capacity: percent,
      };
      data.push(newCarparkInfo)

    }
    return data;
  };