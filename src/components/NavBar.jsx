import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { logout, currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch {
      //
    }
  };

  return (
    <nav>
      <div className="container">
        <div className="nav-wrapper">
          <div className="nav-message">
            {currentUser ? `Hello! ${currentUser.email}` : 'Signed out'}
          </div>
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
              <button
                className="nav-btn nav-btn--user material-symbols-outlined"
                type="button"
              >
                person
              </button>
              <div className="dropdown-content">
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
                  <button
                    type="button"
                    className="dropdown-link"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
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
