import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MainContainer.css';
import {
  selectPosts,
  fetchPosts,
  selectedCategory,
  setCategory,
} from '../../features/redditPostSlice/redditPostSlice';
import {
  fetchPostData,
  showComments,
  setPostId,
  setShowComments,
} from '../../features/redditCommentsSlice/redditCommentsSlice';
import { Navigation } from '../../components/Navigation/Navigation';
import { Topics } from '../Topics/Topics';
/* import Comments from '../Comments/Comments'; */

const MainContainer = () => {
  const redditPost = useSelector(selectPosts);
  const dispatch = useDispatch();
  const isComments = useSelector(showComments);
  const category = useSelector(selectedCategory);
  const Comments = lazy(() => import('../Comments/Comments'));

  useEffect(() => {
    dispatch(fetchPosts(category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const button = document.getElementById('to-top-button');
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop || window.scrollY === 0) {
        button.className = 'red-button hidden';
      } else if (button) {
        button.className = 'red-button';
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
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
        category={category}
      />
      <div className="content-box">
        {isComments ? (
          <Suspense fallback={<div className="loading img-loading"></div>}>
            <Comments
              posts={redditPost}
              handleClick={handleCommentsClick}
              isComments={isComments}
            />
          </Suspense>
        ) : (
          <Topics posts={redditPost} handleClick={handleCommentsClick} />
        )}
      </div>
      <button
        className="red-button hidden"
        id="to-top-button"
        onClick={() => window.scrollTo(0, 0)}
      >
        <i className="bi bi-triangle-fill"></i>
      </button>
    </div>
  );
};

export default MainContainer;
