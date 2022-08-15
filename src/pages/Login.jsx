import { useState, useRef, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImageComponent from '../components/ImageComponent';
import ImageData from '../data/featured_images.json';
import NoImageCard from '../components/NoImageCard';
import { AuthContext } from '../contexts/AuthContext';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data } = ImageData;
  const dataObj = data[0];
  const getBaseUrl = (imageId) =>
    `https://framemark.vam.ac.uk/collections/${imageId}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'V&A Login';
  }, []);

  return (
    <section className="margin-top">
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
          <form className="form" onSubmit={handleSubmit}>
            <h1 className="title">Welcome back</h1>
            <p className="text-center">
              Enter your email and password to sign in.
            </p>
            <div className="form-message-container">
              {error && <div className="form-error">{error}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  ref={emailRef}
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
                  ref={passwordRef}
                  autoComplete="off"
                  required
                />
              </label>
            </div>
            <div className="form-text-right">
              <Link to="/password-reset" className="form-link">
                Forgot password?
              </Link>
            </div>
            <div className="form-button-wrapper">
              <button
                disabled={loading}
                type="submit"
                className="form-button form-button--sign-in"
              >
                Sign in
              </button>
            </div>
            <p className="text-center">
              New to V&A?
              <Link to="/register" className="form-link">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
