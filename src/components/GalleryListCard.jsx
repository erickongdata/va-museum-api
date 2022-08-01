import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import NoImageCard from './NoImageCard';
import ImageComponent from './ImageComponent';

function GalleryListCard({
  imageBaseUrl,
  title,
  artist,
  date,
  systemNumber,
  manifestUrl,
}) {
  const { handleToggleBookmark, bookmarks, fetchManifest } =
    useContext(AppContext);

  const isBookmarked = bookmarks.find(
    (book) => book.systemNumber === systemNumber
  );
  return (
    <figure className="gallery-list-card">
      <Link
        to={imageBaseUrl && `/item/${systemNumber}`}
        title={manifestUrl ? title : 'Details Unavailable'}
        onClick={() => {
          fetchManifest(manifestUrl);
        }}
        className="gallery-list-link"
      >
        <div className="gallery-list-card__image">
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
        <figcaption className="gallery-list-card__caption">
          <div className="gallery-card__title">{title || 'No title'}</div>
          <div className="gallery-card__artist">{artist || ''}</div>
          <div className="gallery-card__date">{date || ''}</div>
        </figcaption>
      </Link>
      <button
        type="button"
        className={`gallery-list-card__btn material-symbols-outlined ${
          isBookmarked ? 'bookmarked' : ''
        }`}
        onClick={() => {
          handleToggleBookmark(
            imageBaseUrl,
            title,
            artist,
            date,
            systemNumber,
            manifestUrl
          );
        }}
      >
        bookmark
      </button>
    </figure>
  );
}

GalleryListCard.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  imageBaseUrl: PropTypes.string.isRequired,
  manifestUrl: PropTypes.string.isRequired,
  systemNumber: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default GalleryListCard;