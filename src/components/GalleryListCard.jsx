import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import NoImageCard from './NoImageCard';
import ImageComponent from './ImageComponent';
import { AuthContext } from '../contexts/AuthContext';

function GalleryListCard({
  imageBaseUrl,
  title,
  artist,
  date,
  systemNumber,
  buttonType,
  buttonShow,
}) {
  const { handleToggleBookmark, bookmarks } = useContext(AuthContext);

  const isBookmarked = bookmarks.find(
    (book) => book.systemNumber === systemNumber
  );

  const buttonClass = () => {
    if (buttonType === 'close') return 'close-icon';
    if (isBookmarked) return 'bookmarked';
    return '';
  };

  return (
    <figure className="gallery-list-card" data-cy="gallery-list-card">
      <Link
        to={imageBaseUrl && `/item/${systemNumber}`}
        title={title || 'No title'}
        className="gallery-list-link"
        data-cy="list-card"
      >
        <div className="gallery-list-card__image">
          {imageBaseUrl ? (
            <ImageComponent
              width="200"
              imageBaseUrl={imageBaseUrl}
              fallback={<NoImageCard />}
              className=""
            />
          ) : (
            <NoImageCard />
          )}
        </div>
        <figcaption className="gallery-list-card__caption">
          <div className="gallery-card__title">{title || 'No title'}</div>
          <div className="gallery-card__artist">{artist || '...'}</div>
          <div className="gallery-card__date">{date || '...'}</div>
        </figcaption>
      </Link>
      {buttonShow ? (
        <button
          type="button"
          className={`gallery-list-card__btn material-symbols-outlined ${buttonClass()}`}
          data-cy="list-card-book"
          onClick={() => {
            handleToggleBookmark(
              imageBaseUrl,
              title,
              artist,
              date,
              systemNumber
            );
          }}
        >
          {buttonType === 'close' ? 'close' : 'bookmark'}
        </button>
      ) : null}
    </figure>
  );
}

GalleryListCard.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  imageBaseUrl: PropTypes.string.isRequired,
  systemNumber: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  buttonType: PropTypes.string,
  buttonShow: PropTypes.bool,
};

GalleryListCard.defaultProps = {
  buttonType: 'bookmark',
  buttonShow: true,
};

export default GalleryListCard;
