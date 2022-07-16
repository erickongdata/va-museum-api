/* eslint no-underscore-dangle: 0 */
import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import LoadingGraphic from '../components/LoadingGraphic';
import NoImageCard from '../components/NoImageCard';
import ImageComponent from '../components/ImageComponent';
import ImageModal from '../components/ImageModal';

function Item() {
  const { itemId } = useParams();
  const { objectManifest, manifestPending, objectRecords } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [displayModal, setDisplayModal] = useState(false);

  const getMetadata = (prop, manifest) => {
    if (!('metadata' in manifest)) return '';
    const dataObj = manifest.metadata.find((data) => data.label === prop);
    if (dataObj === undefined) return '';
    return dataObj.value;
  };

  const getImageBaseUrl = (id, records) => {
    const dataObj = records.find((obj) => obj.systemNumber === id);
    if (dataObj === undefined) return '';
    return dataObj._images._iiif_image_base_url;
  };

  const getTitle = (id, records) => {
    const dataObj = records.find((obj) => obj.systemNumber === id);
    if (dataObj === undefined) return '';
    return dataObj._primaryTitle;
  };

  const imageBaseUrl = getImageBaseUrl(itemId, objectRecords);
  const title = getTitle(itemId, objectRecords);
  const objectType = getMetadata('Object Type', objectManifest);
  const materials = getMetadata('Materials and Techniques', objectManifest);
  const place = getMetadata('Place', objectManifest);
  const accession = getMetadata('Accession Number', objectManifest);
  const description =
    'description' in objectManifest ? objectManifest.description : '';
  const webLink =
    'related' in objectManifest ? objectManifest.related['@id'] : '';

  return (
    <main>
      <div className="container">
        {manifestPending ? (
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
                  <a href={webLink} className="item-block__link">
                    {webLink}
                  </a>
                </div>
              </section>
            </div>
            <div className="close-btn">
              <span
                className="material-symbols-outlined"
                aria-label="previous-page"
              >
                navigate_before
              </span>
              <button type="button" onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
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
    </main>
  );
}

export default Item;
