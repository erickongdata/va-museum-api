import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

function ImageComponent({ width, imageBaseUrl, fallback, className, onClick }) {
  const image = useRef(null);
  const [valid, setValid] = useState(true);

  const checkValid = () => {
    if (
      !image.current.complete ||
      image.current.naturalWidth < 1 ||
      image.current.naturalHeight < 1
    )
      setValid(false);
  };

  if (valid) {
    return (
      <img
        src={`${imageBaseUrl}/full/!${width},/0/default.jpg ${width}w`}
        srcSet={`${imageBaseUrl}/full/!250,/0/default.jpg 250w, ${imageBaseUrl}/full/!350,/0/default.jpg 350w, ${imageBaseUrl}/full/!450,/0/default.jpg 450w, ${imageBaseUrl}/full/!550,/0/default.jpg 550w, ${imageBaseUrl}/full/!700,/0/default.jpg 700w, ${imageBaseUrl}/full/!900,/0/default.jpg 900w`}
        alt=""
        onLoad={checkValid}
        onError={() => setValid(false)}
        ref={image}
        className={className}
        onClick={onClick}
        aria-hidden="true"
      />
    );
  }

  return fallback;
}

ImageComponent.propTypes = {
  width: PropTypes.string.isRequired,
  imageBaseUrl: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  fallback: PropTypes.element.isRequired,
  onClick: PropTypes.func,
};

ImageComponent.defaultProps = {
  onClick: () => {},
};

export default ImageComponent;
