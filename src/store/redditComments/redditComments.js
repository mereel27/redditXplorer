import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './redditComments.css';
import {
  selectPostId,
  selectAvatars,
  isCommentsLoading,
  selectAllComments,
  fetchNextComments,
  selectNextComments,
  setShowComments,
  nextCommentsLoading,
  isError,
} from './redditCommentsSlice';
import { TopicCard } from '../../components/TopicCard/TopicCard';
import { LoadingCard } from '../../components/LoadingCard/LoadingCard';
import fakeAvatar from '../../img/avatar.webp';
import { getTime, decode } from '../../utils/utils';
import { BottomButtons } from '../../features/BottomButtons/BottomButtons';
import { Replies } from '../../features/Replies/Replies';

export const Comments = ({ posts, getVideoUrl, handleClick, isComments }) => {
  const comments = useSelector(selectAllComments);
  const id = useSelector(selectPostId);
  const avatars = useSelector(selectAvatars);
  const commentsLoading = useSelector(isCommentsLoading);
  const nextLoading = useSelector(nextCommentsLoading);
  const dispatch = useDispatch();
  const nextComments = useSelector(selectNextComments);
  const permalink = posts[id].permalink;
  const error = useSelector(isError);

  const handleNextComments = () => {
    dispatch(fetchNextComments({ nextComments, permalink }));
  };

  const handleBackClick = () => {
    dispatch(setShowComments(false));
    setTimeout(() => {
      const savedPos = localStorage.getItem('savePos');
      window.scrollTo(0, savedPos);
    }, 200);
  };

  return (
    <div className="Comments">
      <div className="back-button-container">
        <button
          id="back-button"
          className="red-button"
          onClick={handleBackClick}
        >
          <i className="arrow left"></i> BACK
        </button>
      </div>
      <TopicCard
        index={id}
        post={posts[id]}
        handleClick={handleClick}
        getVideoUrl={getVideoUrl}
        isComments={isComments}
      />
      <div className="comments-box">
        {commentsLoading
          ? Array(10).fill(<LoadingCard isComments={isComments} />)
          : error ? (<div className="error-message">Some error occured, please try again...</div>)
          : comments.length === 0 ? (<div className='no-comments'>There are no comments yet...</div>)
          : comments.map(
              (comment, index) =>
                comment.author && (
                  <div key={index} className="comment">
                    <div className="author-info">
                      <img
                        className="avatar"
                        src={avatars[index] || fakeAvatar}
                        alt=""
                      />
                      <span className="author-name">{comment.author}</span>
                      <div className="separator"></div>
                      <span>{getTime(comment.created_utc)}</span>
                    </div>
                    <div className='comment-container'>
                      <button className="border"></button>
                      <div className='comment-body'
                        dangerouslySetInnerHTML={{
                          __html: decode(comment.body_html),
                        }}
                      ></div>
                      <div className='comment-info-container'>

                        <div className='voting-buttons'>
                          <i className="bi bi-chevron-down icon vote-down"></i>
                            <span className='score'>{comment.score}</span>
                          <i className="bi bi-chevron-up icon vote-up"></i>
                        </div>
                      </div>
                      {comment.replies && <Replies replies={comment.replies.data.children} />}
                    </div> 
                  </div>
                )
            )}
      </div>
      <BottomButtons
        loading={nextLoading}
        ready={comments.length > 0}
        isMore={nextComments.length > 0}
        moreClick={handleNextComments}
      />
    </div>
  );
};
