import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import ImageData from '../data/featured_images.json';
import ImageComponent from './ImageComponent';
import NoImageCard from './NoImageCard';

function StartPageGallery() {
  const { data } = ImageData;
  const { bookmarks } = useContext(AuthContext);

  const getBaseUrl = (imageId) =>
    `https://framemark.vam.ac.uk/collections/${imageId}`;

  return (
    <div className="featured">
      <h2>About</h2>
      <p className="featured-about pb-5">
        The Victoria and Albert museum holds many of the UK&apos;s national
        collections and houses some of the greatest resources for the study of
        architecture, furniture, fashion, textiles, photography, sculpture,
        painting, jewellery, glass, ceramics, book arts, Asian art and design,
        theatre and performance.
      </p>
      {bookmarks.length > 0 ? (
        <>
          <h2>Recent Bookmarks</h2>
          <div className="featured-bookmarks pb-5">
            {bookmarks.slice(-3, bookmarks.length).map((book) => (
              <Link
                to={`/item/${book.systemNumber}`}
                className="featured-bookmarks-item"
                key={`feature-book-${book.systemNumber}`}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <ImageComponent
                  src={`${book.imageBaseUrl}/full/!400,/0/default.jpg`}
                  srcSet={`${book.imageBaseUrl}/full/!250,/0/default.jpg 250w, ${book.imageBaseUrl}/full/!350,/0/default.jpg 350w, ${book.imageBaseUrl}/full/!450,/0/default.jpg 450w, ${book.imageBaseUrl}/full/!550,/0/default.jpg 550w, ${book.imageBaseUrl}/full/!700,/0/default.jpg 700w, ${book.imageBaseUrl}/full/!900,/0/default.jpg 900w`}
                  fallback={<NoImageCard />}
                  className="featured-bookmarks-item__image"
                />
              </Link>
            ))}
          </div>
        </>
      ) : null}
      <h2>Featured People</h2>
      <div className="featured-grid pb-5">
        {data.map((obj) => (
          <Link
            to={`/?query=${obj.search.split(' ').join('+')}&page=1`}
            className={`featured-item featured-item__item${obj.id}`}
            data-cy={`featured-item__item${obj.id}`}
            key={`featured-${obj.id}`}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <ImageComponent
              src={`${getBaseUrl(obj.imageId)}/full/!400,/0/default.jpg`}
              srcSet={`${getBaseUrl(
                obj.imageId
              )}/full/!250,/0/default.jpg 250w, ${getBaseUrl(
                obj.imageId
              )}/full/!350,/0/default.jpg 350w, ${getBaseUrl(
                obj.imageId
              )}/full/!450,/0/default.jpg 450w, ${getBaseUrl(
                obj.imageId
              )}/full/!550,/0/default.jpg 550w, ${getBaseUrl(
                obj.imageId
              )}/full/!700,/0/default.jpg 700w, ${getBaseUrl(
                obj.imageId
              )}/full/!900,/0/default.jpg 900w`}
              fallback={<NoImageCard />}
              className="featured-item__image"
            />
            <figcaption className="featured-item__caption">
              {obj.artist}
            </figcaption>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StartPageGallery;
