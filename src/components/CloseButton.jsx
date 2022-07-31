function CloseButton() {
  return (
    <div className="back-btn">
      <button type="button" onClick={() => window.close()}>
        Close
      </button>
    </div>
  );
}

export default CloseButton;
