import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <div className="back-btn">
      <span className="material-symbols-outlined" aria-label="previous-page">
        navigate_before
      </span>
      <button type="button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}

export default BackButton;
