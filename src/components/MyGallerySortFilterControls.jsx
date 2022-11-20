import { useContext, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function MyGallerySortFilterControls() {
  const { bookmarksSort, setBookmarksSort, setBookmarksFilter } =
    useContext(AuthContext);

  const handleSort = (e) => {
    const selected = e.target.value;
    switch (selected) {
      case 'added':
        setBookmarksSort('added');
        break;
      case 'added-rev':
        setBookmarksSort('added-rev');
        break;
      case 'artist-az':
        setBookmarksSort('artist-az');
        break;
      case 'artist-za':
        setBookmarksSort('artist-za');
        break;
      case 'date':
        setBookmarksSort('date');
        break;
      case 'date-rev':
        setBookmarksSort('date-rev');
        break;
      default:
        setBookmarksSort('added');
    }
  };

  const searchInput = useRef();
  const clearInput = () => {
    searchInput.current.value = '';
    setBookmarksFilter('');
  };

  return (
    <div className="display__filter">
      <div className="display__filter-search">
        <input
          type="text"
          placeholder="Search artist"
          onChange={(e) => setBookmarksFilter(e.target.value)}
          ref={searchInput}
        />
        <button
          type="button"
          aria-label="clear search"
          className=""
          onClick={clearInput}
        >
          Clear
        </button>
      </div>
      <select
        aria-label="Sort by"
        onChange={handleSort}
        defaultValue={bookmarksSort}
      >
        <option value="" disabled>
          Sort by
        </option>
        <option value="added">Sorted by order added</option>
        <option value="added-rev">Sorted by reverse added</option>
        <option value="artist-az">Sorted by artist A-Z</option>
        <option value="artist-za">Sorted by artist Z-A</option>
        <option value="date">Sorted by date</option>
        <option value="date-rev">Sorted by reverse date</option>
      </select>
    </div>
  );
}

export default MyGallerySortFilterControls;
