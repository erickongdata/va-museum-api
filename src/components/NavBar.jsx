import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav>
      <div className="container">
        <div className="nav-buttons">
          <button
            className="nav-btn material-symbols-outlined"
            type="button"
            onClick={() => navigate(-1)}
          >
            arrow_back
          </button>
          <NavLink to="/" className="nav-btn material-symbols-outlined">
            home
          </NavLink>
          <NavLink
            to="/mygallery"
            className="nav-btn material-symbols-outlined"
          >
            bookmarks
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
