import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function MyGallerySortFilterControls() {
  const { bookmarksSort, setBookmarksSort } = useContext(AuthContext);

  const handleSort = (e) => {
    const selected = e.target.value;
    switch (selected) {
      case 'date':
        setBookmarksSort('date');
        break;
      case 'date-rev':
        setBookmarksSort('date-rev');
        break;
      case 'artist-az':
        setBookmarksSort('artist-az');
        break;
      case 'artist-za':
        setBookmarksSort('artist-za');
        break;
      default:
        setBookmarksSort('date');
    }
  };
  return (
    <>
      <select
        aria-label="Sort by"
        onChange={handleSort}
        defaultValue={bookmarksSort}
      >
        <option value="" disabled>
          Sort by
        </option>
        <option value="date">Sorted by order added</option>
        <option value="date-rev">Sorted by reverse added</option>
        <option value="artist-az">Sorted by artist A-Z</option>
        <option value="artist-za">Sorted by artist Z-A</option>
      </select>
      <h2>{bookmarksSort}</h2>
    </>
  );
}

export default MyGallerySortFilterControls;
