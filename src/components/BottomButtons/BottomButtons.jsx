export const BottomButtons = ({ moreClick, loading, ready, isMore }) => {
  
  return (
    <>
      { loading ? (
      <div id="loading">
        <div id="loading-img"></div>
      </div>
      ) : ready ? (
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
      ): null}
    </>
  );
};
