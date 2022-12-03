import { useContext, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function MyGallerySortFilterControls() {
  const {
    bookmarksSort,
    setBookmarksSort,
    bookmarksFilter,
    setBookmarksFilter,
  } = useContext(AuthContext);

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
          value={bookmarksFilter}
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
        <option value="added">Sort: Added Old-New</option>
        <option value="added-rev">Sort: Added New-Old </option>
        <option value="artist-az">Sort: Artist A-Z</option>
        <option value="artist-za">Sort: Artist Z-A</option>
        <option value="date">Sort: Date Old-New</option>
        <option value="date-rev">Sort: Date New-Old</option>
      </select>
    </div>
  );
}

export default MyGallerySortFilterControls;
