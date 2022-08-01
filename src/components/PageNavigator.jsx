import PropTypes from 'prop-types';
import { useRef } from 'react';

function PageNavigator({
  goFirstPage,
  goLastPage,
  decrementPage,
  incrementPage,
  inputActive,
  setInputActive,
  handleInput,
  page,
  pages,
}) {
  const inputBox = useRef();

  return (
    <div className="navigator">
      <button className="navigator__btn" type="button" onClick={goFirstPage}>
        <span className="material-symbols-outlined" aria-label="first-page">
          first_page
        </span>
      </button>
      <button className="navigator__btn" type="button" onClick={decrementPage}>
        <span className="material-symbols-outlined" aria-label="previous-page">
          navigate_before
        </span>
      </button>
      {inputActive ? (
        <input
          className="navigator__input"
          type="number"
          min="1"
          max="9999"
          ref={inputBox}
          onKeyDown={handleInput}
        />
      ) : (
        <button
          type="button"
          className="navigator__display"
          onClick={() => {
            setInputActive(true);
            setTimeout(() => {
              inputBox.current.focus();
            }, 200);
          }}
        >{`${page} of ${pages}`}</button>
      )}

      <button className="navigator__btn" type="button" onClick={incrementPage}>
        <span className="material-symbols-outlined" aria-label="next-page">
          navigate_next
        </span>
      </button>
      <button className="navigator__btn" type="button" onClick={goLastPage}>
        <span className="material-symbols-outlined" aria-label="last-page">
          last_page
        </span>
      </button>
    </div>
  );
}

PageNavigator.propTypes = {
  goFirstPage: PropTypes.func.isRequired,
  goLastPage: PropTypes.func.isRequired,
  incrementPage: PropTypes.func.isRequired,
  decrementPage: PropTypes.func.isRequired,
  inputActive: PropTypes.bool.isRequired,
  setInputActive: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
};

export default PageNavigator;
