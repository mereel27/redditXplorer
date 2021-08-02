export const BottomButtons = ({ moreClick, loading, ready, isMore }) => {
  return (
    <>
      <button
        className="red-button hidden"
        id="to-top-button"
        onClick={() => window.scrollTo(0, 0)}
      >
        <i class="bi bi-triangle-fill"></i>
      </button>
      { loading ? (
      <div id="loading">
        <div id="loading-img"></div>
      </div>
      ) : (
      <div className="more-button-container">
        {isMore ? (
          <button
            className="red-button"
            id="more-button"
            onClick={() => moreClick()}
            >
            MORE
          </button>
        ) : null }
      </div>
      )}
    </>
  );
};
