import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigator = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  return (
    <form
      className="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (searchValue) {
          navigator(`/?query=${searchValue.replace(/\s/g, '+')}&page=1`);
        } else {
          navigator('/');
        }
      }}
    >
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search by artist, object, place..."
          aria-label="search"
          name="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue ? (
          <button
            type="button"
            aria-label="clear search-bar"
            onClick={() => setSearchValue('')}
          >
            &times;
          </button>
        ) : null}
      </div>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
