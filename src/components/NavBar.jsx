import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav>
      <div className="container">
        <div className="nav-wrapper">
          <div className="nav-message">
            {currentUser ? `Hello! ${currentUser.displayName}` : 'Signed out'}
          </div>
          <div className="nav-buttons">
            <button
              className="nav-btn material-symbols-outlined"
              type="button"
              aria-label="back"
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
              <button
                className={`nav-btn ${
                  currentUser ? 'nav-btn--user' : 'nav-btn--guest'
                } material-symbols-outlined`}
                type="button"
                aria-label="user"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                person
              </button>
              <div
                className="dropdown-content"
                style={showDropdown ? { display: 'block' } : null}
              >
                {!currentUser ? (
                  <>
                    <Link to="/login" className="dropdown-link">
                      Sign in
                    </Link>
                    <Link to="/register" className="dropdown-link">
                      New Account
                    </Link>
                  </>
                ) : (
                  <Link to="/logout" className="dropdown-link">
                    Sign out
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
