import { useContext } from 'react';
import { AppContext } from '../AppContext';

function SearchBar() {
  const { setPage, setSearchParams, inputElement } = useContext(AppContext);
  return (
    <form
      className="search"
      onSubmit={(e) => {
        e.preventDefault();
        const query = inputElement.current.value;
        if (query) {
          setSearchParams({ query });
        } else {
          setSearchParams({});
        }
        setPage(1);
      }}
    >
      <input
        type="text"
        placeholder="Search by artist, object, place..."
        aria-label="search"
        ref={inputElement}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
