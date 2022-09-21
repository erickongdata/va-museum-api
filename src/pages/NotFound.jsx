import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageComponent from '../components/ImageComponent';
import ImageData from '../data/featured_images.json';
import NoImageCard from '../components/NoImageCard';

function NotFound() {
  const { data } = ImageData;
  const dataObj = data[4];

  const baseUrl = `https://framemark.vam.ac.uk/collections/${dataObj.imageId}`;

  useEffect(() => {
    document.title = 'V&A Page not found';
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
          <form className="form">
            <h1 className="title">Page not found</h1>
            <p>Click to go to home page</p>
            <div className="form-button-wrapper">
              <Link to="/" className="form-button">
                Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
