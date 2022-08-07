/* eslint no-underscore-dangle: 0 */
const getImageBaseUrlFromRecords = (id, records) => {
  const dataObj = records.find((obj) => obj.systemNumber === id);
  return dataObj?._images._iiif_image_base_url || '';
};

const getImageBaseUrlFromBookmarks = (id, bookM) => {
  const dataObj = bookM.find((book) => book.systemNumber === id);
  return dataObj?.imageBaseUrl || '';
};

const getManifestUrlFromRecords = (id, records) => {
  const dataObj = records.find((obj) => obj.systemNumber === id);
  return dataObj?._images._iiif_presentation_url || '';
};

const getManifestUrlFromBookmarks = (id, bookM) => {
  const dataObj = bookM.find((book) => book.systemNumber === id);
  return dataObj?.manifestUrl || '';
};

const getMetadata = (prop, manifest) => {
  const dataObj = manifest.metadata?.find((data) => data.label === prop);
  return dataObj?.value || '';
};

const getImageBaseUrl = (id, records, bookM, manifest) => {
  const dataObj = records.find((obj) => obj.systemNumber === id);
  if (dataObj) return dataObj._images._iiif_image_base_url || '';
  const bookObj = bookM.find((book) => book.systemNumber === id);
  if (bookObj) return bookObj.imageBaseUrl || '';
  return (
    manifest.sequences?.[0].canvases?.[0].images?.[0].resource?.service?.[
      '@id'
    ] || ''
  );
};

const getTitle = (id, records, bookM, manifest) => {
  const dataObj = records.find((obj) => obj.systemNumber === id);
  if (dataObj) return dataObj._primaryTitle || '';
  const bookObj = bookM.find((book) => book.systemNumber === id);
  if (bookObj) return bookObj.title || '';
  const metaTitle = getMetadata('Title', manifest);
  return metaTitle || '';
};

export {
  getImageBaseUrl,
  getImageBaseUrlFromBookmarks,
  getImageBaseUrlFromRecords,
  getManifestUrlFromRecords,
  getManifestUrlFromBookmarks,
  getMetadata,
  getTitle,
};
