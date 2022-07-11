import { useContext } from 'react';
import { AppContext } from '../AppContext';

function SearchBar() {
  const {
    setPage,
    searchTerm,
    setSearchTerm,
    fetchRecords,
    handleIncrementPage,
    handleDecrementPage,
  } = useContext(AppContext);
  return (
    <form>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            setPage(1);
            fetchRecords();
          }
        }}
      />
      <button
        type="button"
        onClick={() => {
          setPage(1);
          fetchRecords();
        }}
      >
        Search
      </button>
      <button type="button" onClick={handleDecrementPage}>
        Page -
      </button>
      <button type="button" onClick={handleIncrementPage}>
        Page +
      </button>
    </form>
  );
}

export default SearchBar;
