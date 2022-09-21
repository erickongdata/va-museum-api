import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageComponent from '../components/ImageComponent';
import ImageData from '../data/featured_images.json';
import NoImageCard from '../components/NoImageCard';
import { AuthContext } from '../contexts/AuthContext';

function Logout() {
  const { logout, setBookmarks } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data } = ImageData;
  const dataObj = data[1];
  const baseUrl = `https://framemark.vam.ac.uk/collections/${dataObj.imageId}`;

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await logout();
      setBookmarks([]);
      navigate('/');
    } catch {
      setError('Failed to sign out');
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'V&A logout';
  }, []);

  return (
    <section className="margin-top">
      <div className="container">
        <div className="form-layout">
          <div className="form-image">
            <ImageComponent
              width="400"
              imageBaseUrl={baseUrl}
              fallback={<NoImageCard />}
              className=""
            />
          </div>
          <form className="form" onSubmit={handleLogout}>
            <h1 className="title">See you again</h1>
            <p>Click to confirm sign out</p>
            <div className="form-message-container">
              {error && <div className="form-error">{error}</div>}
            </div>
            <div className="form-button-wrapper">
              <button
                disabled={loading}
                type="submit"
                className="form-button form-button--sign-in"
              >
                Sign out
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Logout;
