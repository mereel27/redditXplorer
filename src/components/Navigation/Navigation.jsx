export const Navigation = ({handleCategoryClick, handleMoreClick}) => {
  return (
    <div className="top-nav-container">
      <nav className="top-nav-bar">
        <span id="/top" onClick={handleCategoryClick}>
          Top
        </span>
        <span id="/r/popular" onClick={handleCategoryClick}>
          Popular
        </span>
        <span id="/r/all" onClick={handleCategoryClick}>
          All
        </span>
        <span id="/new" onClick={handleCategoryClick}>
          New
        </span>

        <select
          onChange={handleMoreClick}
          name="more"
          id="more"
          placeholder="More"
        >
          <option selected disabled hidden>
            More
          </option>
          <option value="/r/funny">Funny</option>
          <option value="/r/askReddit">Ask</option>
          <option value="/r/gaming">Gaming</option>
          <option value="/r/aww">Aww</option>
          <option value="/r/pics">Pics</option>
          <option value="/r/music">Music</option>
          <option value="/r/videos">Videos</option>
        </select>
      </nav>
    </div>
  );
};
