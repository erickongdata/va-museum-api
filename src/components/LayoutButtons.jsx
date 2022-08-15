import PropTypes from 'prop-types';

function LayoutButtons({ setColumn, setList }) {
  return (
    <div className="layout-buttons">
      <button
        type="button"
        className="layout-btn material-symbols-outlined"
        aria-label="view style column"
        data-cy="layout-column"
        onClick={setColumn}
      >
        view_column
      </button>
      <button
        type="button"
        className="layout-btn material-symbols-outlined"
        aria-label="view style list"
        data-cy="layout-list"
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
