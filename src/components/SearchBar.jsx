import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  return (
    <form
      className="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (searchValue) {
          navigate(`/?query=${searchValue.replace(/\s/g, '+')}&page=1`);
        } else {
          navigate('/');
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
          className="search-input"
          data-cy="search-input"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue ? (
          <button
            type="button"
            aria-label="clear search-bar"
            className="search-clear-btn"
            data-cy="search-clear-btn"
            onClick={() => setSearchValue('')}
          >
            &times;
          </button>
        ) : null}
      </div>
      <button
        type="submit"
        className="material-symbols-outlined search-submit-btn"
        data-cy="search-submit-btn"
      >
        search
      </button>
    </form>
  );
}

export default SearchBar;
