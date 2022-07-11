import imageNone from '../images/va_logo.svg';

function NoImageCard() {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
        width: '200px',
        height: '200px',
        overflow: 'hidden',
      }}
    >
      <img
        src={imageNone}
        alt=""
        style={{ position: 'absolute', height: '100%' }}
      />
      <div style={{ position: 'absolute' }}>No image</div>
    </div>
  );
}

export default NoImageCard;
