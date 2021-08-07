import React, { useEffect } from 'react';
import './Main.css';
import {
  selectPosts,
  fetchPosts,
  selectedCategory,
  setCategory,
} from '../store/redditPost/redditPostSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPostData,
  showComments,
  setPostId,
  setShowComments
} from '../store/redditComments/redditCommentsSlice';
import { Topics } from './Topics/Topics';
import { Comments } from '../store/redditComments/redditComments';


const Main = () => {
  const redditPost = useSelector(selectPosts);
  const dispatch = useDispatch();
  const isComments = useSelector(showComments);
  const category = useSelector(selectedCategory);

  useEffect(() => {
    dispatch(fetchPosts(category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const button = document.getElementById('to-top-button');
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop || window.scrollY === 0) {
        button.className = 'red-button hidden';
      } else if (button) {
        button.className = 'red-button';
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    })
  }, []);

  const handleCommentsClick = (permalink, index) => {
    if (!isComments) {
      localStorage.savePos = window.scrollY;
      dispatch(setPostId(index));
      dispatch(fetchPostData(permalink));
      window.scrollTo(0, 0);
      dispatch(setShowComments(true));
    } else {
      return;
    }
  };

  const getVideoUrl = (link) => {
    let url =  link.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if(url) {
      return `https://www.youtube-nocookie.com/embed/${url[1]}`;
    }
  };

  const handleMoreClick = (e) => {
    dispatch(fetchPosts(e.target.value));
    dispatch(setCategory(e.target.value));
    dispatch(setShowComments(false));
  };

  const handleCategoryClick = (e) => {
    dispatch(setCategory(e.target.id));
    dispatch(fetchPosts(e.target.id));
    dispatch(setShowComments(false));
  };

  return (
    <div className="Main">
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
    </div>
  );
};

export default Main;
