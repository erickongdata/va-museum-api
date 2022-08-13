/* eslint no-underscore-dangle: 0 */
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingGraphic from '../components/LoadingGraphic';
import NoImageCard from '../components/NoImageCard';
import ImageComponent from '../components/ImageComponent';
import NavBar from '../components/NavBar';
import ImageModal from '../components/ImageModal';
import BackButton from '../components/BackButton';
import useAxios from '../hooks/useAxios';
// import { AuthContext } from '../contexts/AuthContext';

function Item() {
  const { itemId } = useParams();
  const url = `https://api.vam.ac.uk/v2/object/${itemId}`;

  // const { bookmarks } = useContext(AuthContext);

  const { data, error, loaded } = useAxios(url, 'GET', null, {}, true, null);

  const [displayModal, setDisplayModal] = useState(false);

  const imageBaseUrl = data.meta?.images?._iiif_image || '';
  const title = data.record?.titles?.[0]?.title || '';
  const objectType = data.record?.objectType || '';
  const materials = data.record?.materialsAndTechniques || '';
  const place =
    data.record?.placesOfOrigin?.map((obj) => obj.place?.text)?.join(', ') ||
    '';
  const accession = data.record?.accessionNumber || '';
  const description = data.record?.briefDescription || '';
  const webLink = `https://collections.vam.ac.uk/item/${itemId}`;
  // For bookmarks
  const artist =
    data.record?.artistMakerPerson?.map((obj) => obj.name?.text)?.join(', ') ||
    '';
  const date = data.record?.productionDates?.[0]?.date?.text;

  if (!loaded)
    return (
      <>
        <header>
          <NavBar />
        </header>
        <div className="container">
          <LoadingGraphic />
        </div>
      </>
    );

  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="container">
        {error ? <p className="error-message">{error}</p> : null}
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
                <div className="item-block__title">{title || 'No title'}</div>
              </div>
              <div className="item-block">
                <div className="item-block__head">
                  {description && 'Description'}
                </div>
                <div className="item-block__data">{description}</div>
              </div>
              <div className="item-block">
                <div className="item-block__head">{artist && 'Artists'}</div>
                {data.record?.artistMakerPerson?.map((obj) => (
                  <div className="item-block__data" key={uuidv4()}>
                    {obj.name.text}
                  </div>
                ))}
              </div>
              <div className="item-block">
                <div className="item-block__head">
                  {objectType && 'Object Type'}
                </div>
                <div className="item-block__data">{objectType}</div>
              </div>
              <div className="item-block">
                <div className="item-block__head">
                  {materials && 'Materials and Techniques'}
                </div>
                <div className="item-block__data">{materials}</div>
              </div>
              <div className="item-block">
                <div className="item-block__head">{place && 'Place'}</div>
                <div className="item-block__data">{place}</div>
              </div>
              <div className="item-block">
                <div className="item-block__head">{date && 'Date'}</div>
                <div className="item-block__data">{date}</div>
              </div>
              <div className="item-block">
                <div className="item-block__head">
                  {accession && 'Accession number'}
                </div>
                <div className="item-block__data">{accession}</div>
              </div>
              <div className="item-block">
                <div className="item-block__head">
                  {itemId && 'System number'}
                </div>
                <div className="item-block__data">{itemId}</div>
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
