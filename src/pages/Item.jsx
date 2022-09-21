/* eslint no-underscore-dangle: 0 */
import { v4 as uuidv4 } from 'uuid';
import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingGraphic from '../components/LoadingGraphic';
import NoImageCard from '../components/NoImageCard';
import ImageComponent from '../components/ImageComponent';
import ImageModal from '../components/ImageModal';
import BackButton from '../components/BackButton';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../contexts/AuthContext';

function Item() {
  const { itemId } = useParams();
  const url = `https://api.vam.ac.uk/v2/object/${itemId}`;

  const { handleToggleBookmark, bookmarks } = useContext(AuthContext);
  const isBookmarked = bookmarks.find((book) => book.systemNumber === itemId);
  const buttonClass = isBookmarked ? 'bookmark-add-btn--bookmarked' : '';

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
  const artist = data.record?.artistMakerPerson?.[0]?.name?.text || '';
  const artists = data.record?.artistMakerPerson?.map((obj) => obj.name?.text);
  const date = data.record?.productionDates?.[0]?.date?.text || '';

  useEffect(() => {
    document.title = `V&A Item ${itemId}`;
  }, []);

  if (!loaded)
    return (
      <div className="container">
        <LoadingGraphic />
      </div>
    );

  return (
    <>
      <div className="container">
        <div className="margin-top">
          {error ? <p className="error-message">{error}</p> : null}
          <div className="item-data">
            <section>
              <div className="item-data__image" data-cy="item-image">
                {imageBaseUrl ? (
                  <ImageComponent
                    width="400"
                    imageBaseUrl={imageBaseUrl}
                    fallback={<NoImageCard />}
                    className=""
                    onClick={() => setDisplayModal(true)}
                  />
                ) : (
                  <NoImageCard />
                )}
              </div>
              <div className="item-data__btn">
                <button
                  type="button"
                  className={`bookmark-add-btn ${buttonClass}`}
                  data-cy="item-book-btn"
                  onClick={() => {
                    handleToggleBookmark(
                      imageBaseUrl,
                      title,
                      artist,
                      date,
                      itemId
                    );
                  }}
                >
                  {isBookmarked ? 'Bookmarked' : 'Add to My Gallery'}
                </button>
              </div>
            </section>
            <section className="item-data__manifest">
              {title ? (
                <div className="item-block">
                  <div className="item-block__head">Title</div>
                  <div className="item-block__title">{title}</div>
                </div>
              ) : null}
              {description ? (
                <div className="item-block">
                  <div className="item-block__head">Brief Description</div>
                  <div className="item-block__data">{description}</div>
                </div>
              ) : null}
              {objectType ? (
                <div className="item-block">
                  <div className="item-block__head">Object Type</div>
                  <div className="item-block__data">{objectType}</div>
                </div>
              ) : null}
              {materials ? (
                <div className="item-block">
                  <div className="item-block__head">
                    Materials and Techniques
                  </div>
                  <div className="item-block__data">{materials}</div>
                </div>
              ) : null}
              {artists?.length > 0 ? (
                <div className="item-block">
                  <div className="item-block__head">Artists</div>
                  {artists?.map((art) => (
                    <div className="item-block__data" key={uuidv4()}>
                      {art}
                    </div>
                  ))}
                </div>
              ) : null}
              {place ? (
                <div className="item-block">
                  <div className="item-block__head">Place</div>
                  <div className="item-block__data">{place}</div>
                </div>
              ) : null}
              {date ? (
                <div className="item-block">
                  <div className="item-block__head">Date</div>
                  <div className="item-block__data">{date}</div>
                </div>
              ) : null}
              {accession ? (
                <div className="item-block">
                  <div className="item-block__head">Accession number</div>
                  <div className="item-block__data">{accession}</div>
                </div>
              ) : null}
              {itemId ? (
                <div className="item-block">
                  <div className="item-block__head">System number</div>
                  <div className="item-block__data">{itemId}</div>
                </div>
              ) : null}
              <div className="item-block">
                <div className="item-block__head">Website</div>
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
