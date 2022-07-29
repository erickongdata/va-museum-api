import { useContext } from 'react';
import { AppContext } from '../AppContext';
import ImageData from '../data/featured_images.json';
import ImageComponent from './ImageComponent';
import NoImageCard from './NoImageCard';

function StartPageGallery() {
  const { data } = ImageData;
  const { setPage, setSearchParams } = useContext(AppContext);

  const getBaseUrl = (imageId) =>
    `https://framemark.vam.ac.uk/collections/${imageId}`;

  return (
    <div className="featured">
      <h2>Featured People</h2>
      <div className="featured-grid">
        {data.map((obj) => (
          <button
            className={`featured-item featured-item__item${obj.id}`}
            key={`featured-${obj.id}`}
            type="button"
            onClick={() => {
              setSearchParams({ query: obj.search });
              setPage(1);
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
          </button>
        ))}
      </div>
    </div>
  );
}

export default StartPageGallery;
