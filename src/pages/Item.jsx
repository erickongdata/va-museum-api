/* eslint no-underscore-dangle: 0 */
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../AppContext';
import LoadingGraphic from '../components/LoadingGraphic';

function Item() {
  const { itemId } = useParams();
  const { objectManifest, manifestPending, objectRecords } =
    useContext(AppContext);

  const getMetadata = (prop) => {
    const dataObj = objectManifest.metadata.find((data) => data.label === prop);
    if (!dataObj) return '';
    return dataObj.value;
  };

  const imageBaseUrl = (id) => {
    const dataObj = objectRecords.find((obj) => obj.systemNumber === id);
    if (!dataObj) return '';
    return dataObj._images._iiif_image_base_url;
  };

  return (
    <div>
      {manifestPending ? (
        <LoadingGraphic />
      ) : (
        <div>
          <img
            src={
              imageBaseUrl(itemId)
                ? `${imageBaseUrl(itemId)}/full/!300,/0/default.jpg`
                : ''
            }
            alt=""
          />
          <div>Title: {getMetadata('Title')}</div>
          <div>Brief: {getMetadata('Brief Description')}</div>
          <div>
            Materials and Techniques: {getMetadata('Materials and Techniques')}
          </div>
          <div>Place: {getMetadata('Place')}</div>
          <div>System number: {itemId}</div>
        </div>
      )}
    </div>
  );
}

export default Item;
