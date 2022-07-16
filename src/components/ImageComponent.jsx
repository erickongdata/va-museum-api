import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

function ImageComponent({ src, srcSet, fallback, className, onClick }) {
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
        src={src}
        srcSet={srcSet}
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
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  fallback: PropTypes.element.isRequired,
  onClick: PropTypes.func,
};

ImageComponent.defaultProps = {
  onClick: () => {},
};

export default ImageComponent;
