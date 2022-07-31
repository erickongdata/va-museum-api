import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';

function SearchBar() {
  const { inputElement } = useContext(AppContext);
  const navigator = useNavigate();

  return (
    <form
      className="search"
      onSubmit={(e) => {
        e.preventDefault();
        const query = inputElement.current.value;
        if (query) {
          navigator(`/?query=${query.split(' ').join('+')}&page=1`);
        } else {
          navigator('/');
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
