import imageNone from '../images/va_logo.svg';

function NoImageCard() {
  return (
    <div className="no-image-card">
      <img src={imageNone} alt="" />
      <div className="no-image-card__text">No image</div>
    </div>
  );
}

export default NoImageCard;
