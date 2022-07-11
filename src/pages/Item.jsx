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
        <div style={{ display: 'flex' }}>
          <object
            data={
              imageBaseUrl
                ? `${imageBaseUrl}/full/!300,/0/default.jpg`
                : imageNone
            }
            type="image/jpeg"
            style={{ margin: 'auto 2rem' }}
          >
            <img
              src={imageNone}
              alt=""
              style={{ width: '200px', margin: 'auto 2rem' }}
            />
          </object>
          <div>
            <div>Title</div>
            <h1>{title || 'No title'}</h1>
            <div>{description && 'Description'}</div>
            <h2>{description}</h2>
            <div>{objectType && 'Object Type'}</div>
            <h2>{objectType}</h2>
            <div>{materials && 'Materials and Techniques'}</div>
            <h2>{materials}</h2>
            <div>{place && 'Place'}</div>
            <h2>{place}</h2>
            <div>{accession && 'Accession number'}</div>
            <h2>{accession}</h2>
            <div>{itemId && 'System number'}</div>
            <h2>{itemId}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Item;
