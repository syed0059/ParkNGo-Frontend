import { createContext } from 'react';

const ActiveFavouritesContext = createContext({
  isFavouritesActive: false,
  setFavouritesActive: () => {},
});

export default ActiveFavouritesContext;
