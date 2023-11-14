import { createContext } from 'react';

const ActiveSearchContext = createContext({
  isSearchActive: false,
  setSearchActive: () => {},
});

export default ActiveSearchContext;
