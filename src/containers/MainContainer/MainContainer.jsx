import React, { useEffect } from 'react';
import './MainContainer.css';
import {
  selectPosts,
  fetchPosts,
  selectedCategory,
  setCategory,
} from '../../features/redditPostSlice/redditPostSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPostData,
  showComments,
  setPostId,
  setShowComments
} from '../../features/redditCommentsSlice/redditCommentsSlice';
import { Navigation } from '../../components/Navigation/Navigation';
import { Topics } from '../Topics/Topics';
import { Comments } from '../Comments/Comments';


const MainContainer = () => {
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
      <Navigation 
        handleCategoryClick={handleCategoryClick}
        handleMoreClick={handleMoreClick}
      />
      <div className="content-box">
        {isComments ? (
          <Comments
            posts={redditPost}
            handleClick={handleCommentsClick}
            isComments={isComments}
          />
        ) : (
          <Topics
            posts={redditPost}
            handleClick={handleCommentsClick}
          />
        )}
      </div>
    </div>
  );
};

export default MainContainer;
