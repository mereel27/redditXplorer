import React from 'react';
import { useSelector } from 'react-redux';
import './redditComments.css';
import { selectPostId, selectAvatars, isCommentsLoading, selectAllComments } from './redditCommentsSlice';
import { TopicCard } from '../../components/TopicCard/TopicCard';
import { LoadingCard } from '../../components/LoadingCard/LoadingCard';
import fakeAvatar from '../../img/avatar.svg';
import { getTime, decode } from '../../utils/utils';

export const Comments = ({ posts, getVideoUrl, handleClick, isComments }) => {
  const comments = useSelector(selectAllComments);
  const id = useSelector(selectPostId);
  const avatars = useSelector(selectAvatars);
  const commentsLoading = useSelector(isCommentsLoading);

  return (
    <div className="Comments">
      <TopicCard
        post={posts[id]}
        handleClick={handleClick}
        getVideoUrl={getVideoUrl}
        isComments={isComments}
      />
      <div className="comments-box">
        {commentsLoading
          ? Array(10).fill(<LoadingCard isComments={isComments} />)
          : comments.map(
              (comment, index) =>
                comment.author && (
                  <div key={index} className="comment">
                    <div className="author-info">
                      <img className="avatar" src={avatars[index] || fakeAvatar} alt="" />
                      <span className="author-name">{comment.author}</span>
                      <div className="separator"></div>
                      <span>{getTime(comment.created_utc)}</span>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: decode(comment.body_html)}}></div>
                  </div>
                )
            )}
      </div>
    </div>
  );
};
