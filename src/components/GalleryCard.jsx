import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import NoImageCard from './NoImageCard';
import ImageComponent from './ImageComponent';
import { AuthContext } from '../contexts/AuthContext';

function GalleryCard({
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
    <figure className="gallery-card" data-cy="gallery-card">
      <Link
        to={imageBaseUrl && `/item/${systemNumber}`}
        title={title || 'No title'}
        data-cy="card"
      >
        <div className="gallery-card__image">
          {imageBaseUrl ? (
            <ImageComponent
              src={`${imageBaseUrl}/full/!200,/0/default.jpg`}
              srcSet={`${imageBaseUrl}/full/!250,/0/default.jpg 250w, ${imageBaseUrl}/full/!350,/0/default.jpg 350w, ${imageBaseUrl}/full/!450,/0/default.jpg 450w, ${imageBaseUrl}/full/!550,/0/default.jpg 550w, ${imageBaseUrl}/full/!700,/0/default.jpg 700w, ${imageBaseUrl}/full/!900,/0/default.jpg 900w`}
              fallback={<NoImageCard />}
              className=""
            />
          ) : (
            <NoImageCard />
          )}
        </div>
      </Link>
      <figcaption className="gallery-card__caption">
        <div>
          <div className="gallery-card__title">{title || ''}</div>
          <div className="gallery-card__artist">{artist || ''}</div>
          <div className="gallery-card__date">{date || ''}</div>
        </div>
        {buttonShow ? (
          <button
            type="button"
            className={`gallery-card__btn material-symbols-outlined ${buttonClass()}`}
            data-cy="card-book"
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
      </figcaption>
    </figure>
  );
}

GalleryCard.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  imageBaseUrl: PropTypes.string.isRequired,
  systemNumber: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  buttonType: PropTypes.string,
  buttonShow: PropTypes.bool,
};

GalleryCard.defaultProps = {
  buttonType: 'bookmark',
  buttonShow: true,
};

export default GalleryCard;
