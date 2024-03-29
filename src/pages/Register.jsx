import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ImageComponent from '../components/ImageComponent';
import ImageData from '../data/featured_images.json';
import NoImageCard from '../components/NoImageCard';
import { AuthContext } from '../contexts/AuthContext';

function Register() {
  const { signUp, currentUser, logout, updateUserName, initializeDocData } =
    useContext(AuthContext);
  const firstNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data } = ImageData;
  const dataObj = data[2];
  const baseUrl = `https://framemark.vam.ac.uk/collections/${dataObj.imageId}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    try {
      if (currentUser) await logout();
      await signUp(emailRef.current.value, passwordRef.current.value);
      await updateUserName(firstNameRef.current.value);
      await initializeDocData();
      navigate('/');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'V&A Register';
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
          <form className="form" onSubmit={handleSubmit}>
            <h1 className="title">Hello! New Members</h1>
            <p className="text-center">
              Create an account to save your bookmarks to the cloud.
            </p>
            <div className="form-message-container">
              {error && <div className="form-error">{error}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="first-name" className="form-label">
                First name
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  className="form-control"
                  ref={firstNameRef}
                  minLength="2"
                  maxLength="24"
                  required
                />
              </label>
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
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="Must contain at least 6 characters, 1 uppercase, 1 lowercase and 1 number."
                  type="password"
                  name="user-password"
                  id="user-password"
                  className="form-control"
                  autoComplete="off"
                  ref={passwordRef}
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
                  ref={passwordConfirmRef}
                  required
                />
              </label>
            </div>
            <div className="form-button-wrapper">
              <button disabled={loading} type="submit" className="form-button">
                Sign up
              </button>
            </div>
            <p className="text-center">
              Already have an account?
              <Link to="/login" className="form-link">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
