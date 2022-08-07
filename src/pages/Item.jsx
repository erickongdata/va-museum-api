/* eslint no-underscore-dangle: 0 */
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../AppContext';
import LoadingGraphic from '../components/LoadingGraphic';
import NoImageCard from '../components/NoImageCard';
import ImageComponent from '../components/ImageComponent';
import NavBar from '../components/NavBar';
import ImageModal from '../components/ImageModal';
import BackButton from '../components/BackButton';
import {
  getImageBaseUrl,
  getMetadata,
  getTitle,
} from '../utilities/getDataFromJson';

function Item() {
  const { itemId } = useParams();
  const {
    objectManifest,
    isManifestPending,
    objectRecords,
    bookmarks,
    fetchManifest,
    isManifestPresent,
  } = useContext(AppContext);
  const [displayModal, setDisplayModal] = useState(false);

  const imageBaseUrl = getImageBaseUrl(
    itemId,
    objectRecords,
    bookmarks,
    objectManifest
  );
  const title = getTitle(itemId, objectRecords, bookmarks, objectManifest);
  const objectType = getMetadata('Object Type', objectManifest);
  const materials = getMetadata('Materials and Techniques', objectManifest);
  const place = getMetadata('Place', objectManifest);
  const accession = getMetadata('Accession Number', objectManifest);
  const description = objectManifest.description || '';
  const webLink = objectManifest.related?.['@id'] || '';

  useEffect(() => {
    // Initial value of isManifestPresent is true,
    // unless it is set false when clicking on GalleryCard
    if (!isManifestPresent) return;
    const url = `https://iiif.vam.ac.uk/collections/${itemId}/manifest.json`;
    fetchManifest(url);
    // console.log('Item page load fetch');
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="container">
        {isManifestPending ? (
          <LoadingGraphic />
        ) : (
          <div>
            <div className="item-data">
              <section className="item-data__image">
                {imageBaseUrl ? (
                  <ImageComponent
                    src={`${imageBaseUrl}/full/!400,/0/default.jpg`}
                    srcSet={`${imageBaseUrl}/full/!250,/0/default.jpg 250w, ${imageBaseUrl}/full/!350,/0/default.jpg 350w, ${imageBaseUrl}/full/!450,/0/default.jpg 450w, ${imageBaseUrl}/full/!550,/0/default.jpg 550w, ${imageBaseUrl}/full/!700,/0/default.jpg 700w, ${imageBaseUrl}/full/!900,/0/default.jpg 900w`}
                    fallback={<NoImageCard />}
                    className=""
                    onClick={() => setDisplayModal(true)}
                  />
                ) : (
                  <NoImageCard />
                )}
              </section>
              <section className="item-data__manifest">
                <div className="item-block">
                  <div className="item-block__head">Title</div>
                  <h1 className="item-block__title">{title || 'No title'}</h1>
                </div>
                <div className="item-block">
                  <div className="item-block__head">
                    {description && 'Description'}
                  </div>
                  <h2 className="item-block__data">{description}</h2>
                </div>
                <div className="item-block">
                  <div className="item-block__head">
                    {objectType && 'Object Type'}
                  </div>
                  <h2 className="item-block__data">{objectType}</h2>
                </div>
                <div className="item-block">
                  <div className="item-block__head">
                    {materials && 'Materials and Techniques'}
                  </div>
                  <h2 className="item-block__data">{materials}</h2>
                </div>
                <div className="item-block">
                  <div className="item-block__head">{place && 'Place'}</div>
                  <h2 className="item-block__data">{place}</h2>
                </div>
                <div className="item-block">
                  <div className="item-block__head">
                    {accession && 'Accession number'}
                  </div>
                  <h2 className="item-block__data">{accession}</h2>
                </div>
                <div className="item-block">
                  <div className="item-block__head">
                    {itemId && 'System number'}
                  </div>
                  <h2 className="item-block__data">{itemId}</h2>
                </div>
                <div className="item-block">
                  <div className="item-block__head">{webLink && 'Website'}</div>
                  <a
                    href={webLink}
                    className="item-block__link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {webLink}
                  </a>
                </div>
              </section>
            </div>
            <BackButton />
          </div>
        )}
      </div>
      {displayModal ? (
        <ImageModal
          src={`${imageBaseUrl}/full/!400,/0/default.jpg`}
          srcSet={`${imageBaseUrl}/full/!250,/0/default.jpg 250w, ${imageBaseUrl}/full/!350,/0/default.jpg 350w, ${imageBaseUrl}/full/!450,/0/default.jpg 450w, ${imageBaseUrl}/full/!550,/0/default.jpg 550w, ${imageBaseUrl}/full/!700,/0/default.jpg 700w, ${imageBaseUrl}/full/!900,/0/default.jpg 900w`}
          onClick={(e) => {
            if (e.target.dataset.component === 'modal-image') return;
            setDisplayModal(false);
          }}
        />
      ) : null}
    </>
  );
}

export default Item;
