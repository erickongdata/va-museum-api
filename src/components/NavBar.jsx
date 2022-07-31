import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div className="container">
        <div className="nav-buttons">
          <Link
            type="button"
            className="nav-btn material-symbols-outlined"
            to="/"
          >
            photo_library
          </Link>
          <Link
            to="/mygallery"
            type="button"
            className="nav-btn material-symbols-outlined"
          >
            bookmarks
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
