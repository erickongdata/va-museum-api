import PropTypes from 'prop-types';

function LayoutButtons({ setColumn, setList }) {
  return (
    <div className="layout-buttons">
      <button
        type="button"
        className="layout-btn material-symbols-outlined"
        aria-label="view style column"
        onClick={setColumn}
      >
        view_column
      </button>
      <button
        type="button"
        className="layout-btn material-symbols-outlined"
        aria-label="view style list"
        onClick={setList}
      >
        list
      </button>
    </div>
  );
}

LayoutButtons.propTypes = {
  setColumn: PropTypes.func.isRequired,
  setList: PropTypes.func.isRequired,
};

export default LayoutButtons;
