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

  const imageBaseUrl = getImageBaseUrl(itemId, objectRecords);
  const title = getMetadata('Title', objectManifest);
  const objectType = getMetadata('Object Type', objectManifest);
  const materials = getMetadata('Materials and Techniques', objectManifest);
  const place = getMetadata('Place', objectManifest);
  const accession = getMetadata('Accession Number', objectManifest);
  const description =
    'description' in objectManifest ? objectManifest.description : '';

  return (
    <div>
      {manifestPending ? (
        <LoadingGraphic />
      ) : (
        <div>
          <object
            data={
              imageBaseUrl
                ? `${imageBaseUrl}/full/!300,/0/default.jpg`
                : imageNone
            }
            type="image/jpeg"
          >
            <img src={imageNone} alt="" style={{ width: '200px' }} />
          </object>
          <div>Title: {title}</div>
          <div>Description: {description}</div>
          <div>Object Type: {objectType}</div>
          <div>Materials and Techniques: {materials}</div>
          <div>Place: {place}</div>
          <div>Accession number: {accession}</div>
          <div>System number: {itemId}</div>
        </div>
      )}
    </div>
  );
}

export default Item;
