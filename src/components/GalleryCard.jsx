import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import imageNone from '../favicon.svg';

function GalleryCard({ imageBaseUrl, title, systemNumber, manifestUrl }) {
  return (
    <Link
      to={imageBaseUrl && `/item/${systemNumber}`}
      title={manifestUrl ? 'See details' : 'Details Unavailable'}
    >
      <div>
        <img
          src={
            imageBaseUrl
              ? `${imageBaseUrl}/full/!100,/0/default.jpg`
              : imageNone
          }
          alt=""
          style={{ width: '200px' }}
        />

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
