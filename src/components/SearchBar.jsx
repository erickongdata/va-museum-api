import { useContext } from 'react';
import { AppContext } from '../AppContext';

function SearchBar() {
  const { setSearchParams, searchParams, inputElement } =
    useContext(AppContext);
  return (
    <form
      className="search"
      onSubmit={(e) => {
        e.preventDefault();
        const query = inputElement.current.value;
        if (query) {
          searchParams.set('query', query);
          searchParams.set('page', 1);
          setSearchParams(searchParams);
        } else {
          setSearchParams({});
        }
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
