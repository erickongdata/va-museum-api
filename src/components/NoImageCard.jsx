import imageNone from '../images/art.svg';

function NoImageCard() {
  return (
    <div className="no-image-card">
      <img src={imageNone} alt="" />
      <div className="no-image-card__text">Unavailable</div>
    </div>
  );
}

export default NoImageCard;
