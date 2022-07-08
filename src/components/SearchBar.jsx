import { useContext } from 'react';
import { AppContext } from '../AppContext';

function SearchBar() {
  const { searchTerm, setSearchTerm } = useContext(AppContext);
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;
