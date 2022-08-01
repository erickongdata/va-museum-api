import PropTypes from 'prop-types';

function GalleryLayoutColumns({ galleryList }) {
  const galleryHeight = Math.floor(galleryList.length / 3) || 1;
  return (
    <ul>
      <div className="gallery">
        <div className="gallery-column">
          {galleryList.slice(0, galleryHeight)}
        </div>
        <div className="gallery-column">
          {galleryList.slice(galleryHeight, galleryHeight * 2)}
        </div>
        <div className="gallery-column">
          {galleryList.slice(galleryHeight * 2, galleryHeight * 3)}
        </div>
      </div>
    </ul>
  );
}

GalleryLayoutColumns.propTypes = {
  galleryList: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default GalleryLayoutColumns;
