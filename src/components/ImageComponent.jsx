import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

function ImageComponent({ src, srcSet, fallback }) {
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
      />
    );
  }

  return fallback;
}

ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
  fallback: PropTypes.element.isRequired,
};

export default ImageComponent;
