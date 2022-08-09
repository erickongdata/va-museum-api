import { Link } from 'react-router-dom';
import ImageComponent from '../components/ImageComponent';
import Navbar from '../components/NavBar';
import ImageData from '../data/featured_images.json';
import NoImageCard from '../components/NoImageCard';

function Login() {
  const { data } = ImageData;
  const dataObj = data[Math.floor(Math.random() * data.length)];
  const getBaseUrl = (imageId) =>
    `https://framemark.vam.ac.uk/collections/${imageId}`;

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
            <form className="form">
              <h1 className="title">Hello! New Members</h1>
              <div className="form-message-container">
                <div className="form-message" />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="user-password" className="form-label">
                  Password
                  <input
                    type="password"
                    name="user-password"
                    id="user-password"
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label
                  htmlFor="user-password-confirmation"
                  className="form-label"
                >
                  Password Confirmation
                  <input
                    type="password"
                    name="user-password-confirmation"
                    id="user-password-confirmation"
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                </label>
              </div>
              <div className="form-button-wrapper">
                <button type="submit" className="form-button">
                  Sign up
                </button>
              </div>
              <div className="form-text">
                Already have an account?
                <Link to="/login" className="form-link">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
