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
        {imageBaseUrl ? (
          <object
            data={`${imageBaseUrl}/full/!200,/0/default.jpg`}
            type="image/jpeg"
            style={{ width: '200px' }}
          >
            <NoImageCard />
          </object>
        ) : (
          <NoImageCard />
        )}
        <div>{title || 'No title'}</div>
        <div>{date || ''}</div>
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
