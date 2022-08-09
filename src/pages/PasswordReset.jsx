import ImageComponent from '../components/ImageComponent';
import Navbar from '../components/NavBar';
import ImageData from '../data/featured_images.json';
import NoImageCard from '../components/NoImageCard';

function PasswordReset() {
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
              <h1 className="title">Forget your password?</h1>
              <p>We will send you an email to reset it.</p>
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
              <div className="form-button-wrapper">
                <button
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
    </>
  );
}

export default PasswordReset;
