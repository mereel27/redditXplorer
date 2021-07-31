import React, { useEffect } from 'react';
import './Main.css';
import {
  selectPosts,
  fetchPosts,
  fetchNextPage,
  selectedCategory,
  setCategory,
  selectNextPage,
  nextLoading,
} from '../store/redditPost/redditPostSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPostData,
  showComments,
  setPostId,
  setShowComments,
} from '../store/redditComments/redditCommentsSlice';
import { Topics } from './Topics/Topics';
import { Comments } from '../store/redditComments/redditComments';

const Main = () => {
  const redditPost = useSelector(selectPosts);
  const dispatch = useDispatch();
  const isComments = useSelector(showComments);
  const category = useSelector(selectedCategory);
  const nextPage = useSelector(selectNextPage);
  const nextPageLoading = useSelector(nextLoading);

  useEffect(() => {
    dispatch(fetchPosts(category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCommentsClick = (permalink, index) => {
    if (!isComments) {
      localStorage.savePos = window.scrollY;
      dispatch(setPostId(index));
      dispatch(setShowComments(true));
      dispatch(fetchPostData(permalink));
      window.scrollTo(0, 0);
    } else {
      return;
    }
  };

  const getVideoUrl = (link) => {
    return `https://www.youtube-nocookie.com/embed/${
      link.match(
        /(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      )[1]
    }`;
  };

  const handleMoreClick = (e) => {
    dispatch(fetchPosts(e.target.value));
    dispatch(setCategory(e.target.value));
    dispatch(setShowComments(false));
  };

  const handleCategoryClick = (e) => {
    dispatch(fetchPosts(e.target.id));
    dispatch(setCategory(e.target.id));
    dispatch(setShowComments(false));
  };

  const handleNextPage = () => {
    dispatch(fetchNextPage({ nextPage, category }));
  };

  const handleBackClick = () => {
    dispatch(setShowComments(false));
    setTimeout(() => {
      const savedPos = localStorage.getItem('savePos');
      window.scrollTo(0, savedPos);
    }, 200);
  };

  return (
    <div className="Main">
      <div className="nav-container">
        <nav>
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
      <div className={isComments ? 'back-button-container' : 'hidden'}>
        <button
          id="back-button"
          className="red-button"
          onClick={handleBackClick}
        >
          <i className="arrow left"></i> BACK
        </button>
      </div>
      <div className="content-box">
        {isComments ? (
          <Comments
            posts={redditPost}
            handleClick={handleCommentsClick}
            getVideoUrl={getVideoUrl}
            isComments={isComments}
          />
        ) : (
          <Topics
            posts={redditPost}
            handleClick={handleCommentsClick}
            getVideoUrl={getVideoUrl}
          />
        )}
      </div>

      {nextPageLoading ? (
        <div id="loading">
          <div id="loading-img"></div>
        </div>
      ) : nextPage.length ? (
        <div className="more-button-container">
          <button
            className="red-button"
            id="more-button"
            onClick={() => window.scrollTo(0, 0)}
          >
            BACK TO TOP
          </button>
          <button
            className="red-button"
            id="more-button"
            onClick={() => handleNextPage()}
          >
            MORE
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Main;
