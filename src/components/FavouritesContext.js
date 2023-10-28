import React, { createContext, useState, useEffect } from 'react';
const carparkInterface = require('../carparkInterface/carparkInterface');

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState({});

    useEffect(() => {
      const loadFavourites = async () => {
        const favs = await carparkInterface.getFavourites();
        const favsObject = favs.reduce((acc, id) => ({ ...acc, [id]: true }), {});
        setFavourites(favsObject);
      };
  
      loadFavourites();
    }, []);
  
    const toggleFavourites = async (carparkId) => {
      const idString = carparkId.toString();
  
      if (favourites[carparkId]) {
        await carparkInterface.removeFromFavourites(idString);
      } else {
        await carparkInterface.addToFavourites(idString);
      }
  
      // Update favourites after toggling
      const updatedFavourites = { ...favourites, [carparkId]: !favourites[carparkId] };
      setFavourites(updatedFavourites);
    };
  
    return (
      <FavouritesContext.Provider value={{ favourites, toggleFavourites }}>
        {children}
      </FavouritesContext.Provider>
    );
  };
  
  export default FavouritesContext;