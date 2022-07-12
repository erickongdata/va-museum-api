import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import NoImageCard from './NoImageCard';

function GalleryCard({ imageBaseUrl, title, date, systemNumber, manifestUrl }) {
  const { fetchManifest } = useContext(AppContext);
  return (
    <Link
      to={imageBaseUrl && `/item/${systemNumber}`}
      title={manifestUrl ? 'See details' : 'Details Unavailable'}
      className="gallery__card"
      onClick={() => {
        fetchManifest(manifestUrl);
      }}
    >
      <div>
        <div className="gallery__card-image">
          {imageBaseUrl ? (
            <object
              data={`${imageBaseUrl}/full/!200,/0/default.jpg`}
              type="image/jpeg"
              style={{ width: '100%' }}
            >
              <NoImageCard />
            </object>
          ) : (
            <NoImageCard />
          )}
        </div>
        <div className="gallery__card-caption">
          <div className="gallery__card-title">{title || 'No title'}</div>
          <div className="gallery__card-date">{date || ''}</div>
        </div>
      </div>
    </Link>
  );
}

GalleryCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageBaseUrl: PropTypes.string.isRequired,
  manifestUrl: PropTypes.string.isRequired,
  systemNumber: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default GalleryCard;
