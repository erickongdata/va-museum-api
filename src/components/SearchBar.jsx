import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigator = useNavigate();

  return (
    <form
      className="search"
      onSubmit={(e) => {
        e.preventDefault();
        const query = e.target.search.value;
        if (query) {
          navigator(`/?query=${query.replace(/\s/g, '+')}&page=1`);
        } else {
          navigator('/');
        }
      }}
    >
      <input
        type="text"
        placeholder="Search by artist, object, place..."
        aria-label="search"
        name="search"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
