import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('Hello');
  const context = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
    }),
    [searchTerm]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
