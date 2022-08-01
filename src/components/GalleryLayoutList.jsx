import PropTypes from 'prop-types';

function GalleryLayoutList({ galleryList }) {
  return <ul className="gallery-list">{galleryList}</ul>;
}

GalleryLayoutList.propTypes = {
  galleryList: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default GalleryLayoutList;
