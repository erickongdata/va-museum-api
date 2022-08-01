import PropTypes from 'prop-types';

function LayoutButtons({ setColumn, setList }) {
  return (
    <div className="layout-buttons">
      <button
        type="button"
        className="layout-btn material-symbols-outlined"
        onClick={setColumn}
      >
        view_column
      </button>
      <button
        type="button"
        className="layout-btn material-symbols-outlined"
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
