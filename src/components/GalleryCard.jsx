import PropTypes from 'prop-types';
import imageNone from '../favicon.svg';

function GalleryCard({ url, title }) {
  return (
    <div>
      {url ? (
        <img src={url} alt="" style={{ width: '200px' }} />
      ) : (
        <img src={imageNone} alt="" style={{ width: '200px' }} />
      )}
      <div>{title || 'No title'}</div>
    </div>
  );
}

GalleryCard.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default GalleryCard;
