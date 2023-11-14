import React, { createContext, useState, useEffect } from 'react';
const carparkInterface = require('../carparkInterface/carparkInterface');

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
      const loadFavourites = async () => {
        const favs = await carparkInterface.getFavourites();
        // const favsObject = favs.reduce((acc, id) => ({ ...acc, [id]: true }), {});
        setFavourites(favs);
      };
  
      loadFavourites();
    }, []);
  
    const toggleFavourites = async (carparkId) => {
      const idString = carparkId.toString();
  
      // Check if the carparkId is already in the favourites array
      const isFavourite = favourites.includes(carparkId);

      let updatedFavourites;
      if (isFavourite) {
        // Remove the carparkId from favourites
        updatedFavourites = favourites.filter(favId => favId !== carparkId);
        await carparkInterface.removeFromFavourites(idString);
      } else {
        // Add the carparkId to favourites
        updatedFavourites = [...favourites, carparkId];
        await carparkInterface.addToFavourites(idString);
      }
  
      // Update favourites after toggling
      setFavourites(updatedFavourites);
    };
  
    return (
      <FavouritesContext.Provider value={{ favourites, toggleFavourites }}>
        {children}
      </FavouritesContext.Provider>
    );
  };
  
  export default FavouritesContext;