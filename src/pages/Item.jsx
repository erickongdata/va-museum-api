import { useContext } from 'react';
import { AppContext } from '../AppContext';

function Item() {
  const { objectManifest } = useContext(AppContext);

  const title = objectManifest.metadata.find(
    (data) => data.label === 'Title'
  ).value;
  const brief = objectManifest.metadata.find(
    (data) => data.label === 'Brief Description'
  ).value;
  const materials = objectManifest.metadata.find(
    (data) => data.label === 'Materials and Techniques'
  ).value;
  const place = objectManifest.metadata.find(
    (data) => data.label === 'Place'
  ).value;

  return (
    <div>
      <div>Title: {title || 'No title'}</div>
      <div>Brief: {brief || ''}</div>
      <div>Materials and Techniques {materials || ''}</div>
      <div>Place {place || ''}</div>
    </div>
  );
}

export default Item;
