import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import DocSubscribe from './DocSubscribe';

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
              data-cy="nav-back"
              onClick={() => navigate(-1)}
            >
              arrow_back
            </button>
            <button
              className="material-symbols-outlined nav-btn"
              type="button"
              aria-label="top of screen"
              data-cy="nav-top"
              onClick={() =>
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
              }
            >
              arrow_upward
            </button>
            <NavLink
              to="/"
              className="material-symbols-outlined nav-btn"
              data-cy="nav-home"
              onClick={() => window.scrollTo(0, 0)}
            >
              home
            </NavLink>
            <NavLink
              to="/mygallery"
              className="material-symbols-outlined nav-btn nav-btn--book"
              data-cy="nav-mygallery"
              onClick={() => window.scrollTo(0, 0)}
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
                data-cy="nav-user"
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
                    <Link
                      to="/login"
                      className="dropdown-link"
                      data-cy="drop-sign-in"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="dropdown-link"
                      data-cy="drop-new-account"
                    >
                      New Account
                    </Link>
                  </>
                ) : (
                  <>
                    <DocSubscribe />
                    <div className="dropdown-user">
                      <div className="dropdown-user__label">User</div>
                      <div className="dropdown-user__user">
                        {currentUser.displayName}
                      </div>
                    </div>
                    <Link
                      to="/logout"
                      className="dropdown-link"
                      data-cy="drop-sign-out"
                    >
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
