import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import NoImageCard from './NoImageCard';
import ImageComponent from './ImageComponent';

function GalleryCard({
  imageBaseUrl,
  title,
  artist,
  date,
  systemNumber,
  manifestUrl,
}) {
  const { fetchManifest, handleToggleBookmark, bookmarks } =
    useContext(AppContext);

  const isBookmarked = bookmarks.find(
    (book) => book.systemNumber === systemNumber
  );
  return (
    <figure className="gallery__card">
      <div className="gallery__card-buttons">
        <button
          type="button"
          className={`gallery__card-btn gallery__card-btn--bookmark material-symbols-outlined ${
            isBookmarked ? 'bookmarked' : ''
          }`}
          onClick={() =>
            handleToggleBookmark(
              imageBaseUrl,
              title,
              artist,
              date,
              systemNumber,
              manifestUrl
            )
          }
        >
          bookmark
        </button>
      </div>
      <Link
        to={imageBaseUrl && `/item/${systemNumber}`}
        title={manifestUrl ? title : 'Details Unavailable'}
        onClick={() => {
          fetchManifest(manifestUrl);
        }}
      >
        <div className="gallery__card-image">
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
      <figcaption className="gallery__card-caption">
        <div className="gallery__card-title">{title || 'No title'}</div>
        <div className="gallery__card-artist">{artist || ''}</div>
        <div className="gallery__card-date">{date || ''}</div>
      </figcaption>
    </figure>
  );
}

GalleryCard.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  imageBaseUrl: PropTypes.string.isRequired,
  manifestUrl: PropTypes.string.isRequired,
  systemNumber: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default GalleryCard;
