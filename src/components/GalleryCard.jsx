import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import imageNone from '../favicon.svg';

function GalleryCard({ imageBaseUrl, title, systemNumber, manifestUrl }) {
  const { fetchManifest } = useContext(AppContext);
  return (
    <Link
      to={imageBaseUrl && `/item/${systemNumber}`}
      title={manifestUrl ? 'See details' : 'Details Unavailable'}
      style={{
        display: 'inline-block',
        width: '200px',
        margin: '10px',
      }}
      className="link"
      onClick={() => {
        fetchManifest(manifestUrl);
      }}
    >
      <div>
        <object
          data={
            imageBaseUrl
              ? `${imageBaseUrl}/full/!120,/0/default.jpg`
              : imageNone
          }
          type="image/jpeg"
          style={{ width: '200px' }}
        >
          <img src={imageNone} alt="" style={{ width: '200px' }} />
        </object>
        <div>{title || 'No title'}</div>
      </div>
    </Link>
  );
}

GalleryCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageBaseUrl: PropTypes.string.isRequired,
  manifestUrl: PropTypes.string.isRequired,
  systemNumber: PropTypes.string.isRequired,
};

export default GalleryCard;
