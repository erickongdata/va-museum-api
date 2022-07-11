/* eslint no-underscore-dangle: 0 */
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../AppContext';
import LoadingGraphic from '../components/LoadingGraphic';
import imageNone from '../favicon.svg';

function Item() {
  const { itemId } = useParams();
  const { objectManifest, manifestPending, objectRecords } =
    useContext(AppContext);

  const getMetadata = (prop) => {
    if (!objectManifest.metadata) return '';
    const dataObj = objectManifest.metadata.find((data) => data.label === prop);
    if (dataObj === undefined) return '';
    return dataObj.value;
  };

  const imageBaseUrl = (id) => {
    const dataObj = objectRecords.find((obj) => obj.systemNumber === id);
    if (!dataObj) return '';
    return dataObj._images._iiif_image_base_url;
  };

  return (
    <div>
      <div>Data Pending: {manifestPending.toString()}</div>
      {manifestPending ? (
        <LoadingGraphic />
      ) : (
        <div>
          <object
            data={
              imageBaseUrl(itemId)
                ? `${imageBaseUrl(itemId)}/full/!300,/0/default.jpg`
                : imageNone
            }
            type="image/jpeg"
          >
            <img src={imageNone} alt="" style={{ width: '200px' }} />
          </object>
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
