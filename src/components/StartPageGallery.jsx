import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import SpecialData from '../data/special_images.json';
import ImageData from '../data/featured_images.json';
import ImageComponent from './ImageComponent';
import NoImageCard from './NoImageCard';

function StartPageGallery() {
  const { data: specialData } = SpecialData;
  const { data } = ImageData;
  const { bookmarks } = useContext(AuthContext);

  const getBaseUrl = (imageId) =>
    `https://framemark.vam.ac.uk/collections/${imageId}`;

  return (
    <div className="featured margin-top">
      <h2 className="border-bottom">About</h2>
      <p className="featured-about mb-5">
        The Victoria and Albert museum holds many of the UK&apos;s national
        collections and houses some of the greatest resources for the study of
        architecture, furniture, fashion, textiles, photography, sculpture,
        painting, jewellery, glass, ceramics, book arts, Asian art and design,
        theatre and performance.
      </p>
      {bookmarks.length > 0 ? (
        <>
          <h2 className="border-bottom">Recent Bookmarks</h2>
          <div className="featured-row mb-5">
            {bookmarks.slice(-3, bookmarks.length).map((book) => (
              <Link
                to={`/item/${book.systemNumber}`}
                className="featured-row-item"
                key={`feature-book-${book.systemNumber}`}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <ImageComponent
                  width="400"
                  imageBaseUrl={book.imageBaseUrl}
                  fallback={<NoImageCard />}
                  className="featured-row-item__image"
                />
              </Link>
            ))}
          </div>
        </>
      ) : null}
      {specialData.length > 0 ? (
        <>
          <h2 className="border-bottom">Special</h2>
          <div className="featured-row mb-5">
            {specialData.map((obj) => (
              <Link
                to={`/?query=${obj.search.split(' ').join('+')}&page=1`}
                className="featured-row-item"
                key={`special-${obj.id}`}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <ImageComponent
                  width="400"
                  imageBaseUrl={`https://framemark.vam.ac.uk/collections/${obj.imageId}`}
                  fallback={<NoImageCard />}
                  className="featured-row-item__image"
                />
              </Link>
            ))}
          </div>
        </>
      ) : null}
      <h2 className="border-bottom">Featured People</h2>
      <div className="featured-grid mb-5">
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
              width="400"
              imageBaseUrl={getBaseUrl(obj.imageId)}
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
