export const Navigation = ({handleCategoryClick, handleMoreClick, category}) => {
  const more = ["/r/funny", "/r/askReddit", "/r/gaming", "/r/aww", "/r/pics", "/r/music", "/r/videos"];
  return (
    <div className="top-nav-container">
      <nav className="top-nav-bar">
        <span id="/top" onClick={handleCategoryClick} className={category === '/top' ? 'selected' : ''}>
          Top
        </span>
        <span id="/r/popular" onClick={handleCategoryClick} className={category === '/r/popular' ? 'selected' : ''}>
          Popular
        </span>
        <span id="/r/all" onClick={handleCategoryClick} className={category === '/r/all' ? 'selected' : ''}>
          All
        </span>
        <span id="/new" onClick={handleCategoryClick} className={category === '/new' ? 'selected' : ''}>
          New
        </span>

        <select
          onChange={handleMoreClick}
          name="more"
          id="more"
          placeholder="More"
          className={more.includes(category) ? 'selected' : ''}
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
