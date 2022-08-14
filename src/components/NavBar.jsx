import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-wrapper">
          <div className="nav-buttons">
            <button
              className="material-symbols-outlined nav-btn"
              type="button"
              aria-label="back"
              onClick={() => navigate(-1)}
            >
              arrow_back
            </button>
            <NavLink to="/" className="material-symbols-outlined nav-btn">
              home
            </NavLink>
            <NavLink
              to="/mygallery"
              className="material-symbols-outlined nav-btn nav-btn--book"
            >
              bookmarks
            </NavLink>
            <div className="dropdown">
              <button
                className={`material-symbols-outlined nav-btn ${
                  currentUser ? 'nav-btn--user' : 'nav-btn--guest'
                }`}
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
                  <>
                    <div className="dropdown-user">
                      <div className="dropdown-user__label">User</div>
                      <div className="dropdown-user__user">
                        {currentUser.displayName}
                      </div>
                    </div>
                    <Link to="/logout" className="dropdown-link">
                      Sign out
                    </Link>
                  </>
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
