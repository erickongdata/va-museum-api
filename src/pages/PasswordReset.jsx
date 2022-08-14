import { useContext, useRef, useState, useEffect } from 'react';
import ImageComponent from '../components/ImageComponent';
import ImageData from '../data/featured_images.json';
import NoImageCard from '../components/NoImageCard';
import { AuthContext } from '../contexts/AuthContext';

function PasswordReset() {
  const emailRef = useRef();
  const { resetPassword } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { data } = ImageData;
  const dataObj = data[1];
  const getBaseUrl = (imageId) =>
    `https://framemark.vam.ac.uk/collections/${imageId}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }

    setLoading(false);
  };

  useEffect(() => {
    document.title = 'V&A Password Reset';
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
            <h1 className="title">Forget your password?</h1>
            <p>We will send you an email to reset it.</p>
            <div className="form-message-container">
              {error && <div className="form-error">{error}</div>}
              {message && <div className="form-message">{message}</div>}
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
            <div className="form-button-wrapper">
              <button
                disabled={loading}
                type="submit"
                className="form-button form-button--sign-in"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PasswordReset;
