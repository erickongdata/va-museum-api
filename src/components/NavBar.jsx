import { Link, NavLink, useNavigate } from 'react-router-dom';

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
          <div className="dropdown">
            <button className="nav-btn material-symbols-outlined" type="button">
              person
            </button>
            <div className="dropdown-content">
              <Link to="/login" className="dropdown-link">
                Sign in
              </Link>
              <Link to="/register" className="dropdown-link">
                New Account
              </Link>
              <Link to="/" className="dropdown-link">
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
