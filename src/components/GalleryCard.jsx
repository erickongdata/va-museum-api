import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import imageNone from '../favicon.svg';

function GalleryCard({ url, title, systemNumber }) {
  const { fetchManifest } = useContext(AppContext);
  return (
    <Link
      to={`/item/${systemNumber}`}
      onClick={() => fetchManifest(systemNumber)}
    >
      <div>
        {url ? (
          <img src={url} alt="" style={{ width: '200px' }} />
        ) : (
          <img src={imageNone} alt="" style={{ width: '200px' }} />
        )}
        <div>{title || 'No title'}</div>
      </div>
    </Link>
  );
}

GalleryCard.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  systemNumber: PropTypes.string.isRequired,
};

export default GalleryCard;
