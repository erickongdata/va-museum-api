import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageComponent from '../components/ImageComponent';
import Navbar from '../components/NavBar';
import ImageData from '../data/featured_images.json';
import NoImageCard from '../components/NoImageCard';
import { AuthContext } from '../contexts/AuthContext';

function Logout() {
  const { logout, setBookmarks } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data } = ImageData;
  const dataObj = data[4];
  const getBaseUrl = (imageId) =>
    `https://framemark.vam.ac.uk/collections/${imageId}`;

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

  return (
    <>
      <header>
        <Navbar />
      </header>
      <section>
        <div className="container">
          <div className="form-layout">
            <div className="form-image">
              <ImageComponent
                src={`${getBaseUrl(dataObj.imageId)}/full/!400,/0/default.jpg`}
                srcSet={`${getBaseUrl(
                  dataObj.imageId
                )}/full/!250,/0/default.jpg 250w, ${getBaseUrl(
                  dataObj.imageId
                )}/full/!350,/0/default.jpg 350w, ${getBaseUrl(
                  dataObj.imageId
                )}/full/!450,/0/default.jpg 450w, ${getBaseUrl(
                  dataObj.imageId
                )}/full/!550,/0/default.jpg 550w, ${getBaseUrl(
                  dataObj.imageId
                )}/full/!700,/0/default.jpg 700w, ${getBaseUrl(
                  dataObj.imageId
                )}/full/!900,/0/default.jpg 900w`}
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
    </>
  );
}

export default Logout;
