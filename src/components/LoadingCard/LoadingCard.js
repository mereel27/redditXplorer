import React from 'react';
import './LoadingCard.css';

export const LoadingCard = () => {
  return (
    <div className="topic-box" style={{padding: '2%'}}>
      <div className="post-author">
        <div className="avatar-loading loading" />
        <div className="author-loading loading"></div>
      </div>

      <div className="title loading"></div>

      <div className="content-loading">
        <div className="content loading"></div>
        <div className="content loading"></div>
        <div className="content loading"></div>
        <div className="content loading"></div>
      </div>

      <div className="info">
        <div className="comment-loading loading"></div>
        <div className="comment-loading loading"></div>
      </div>
    </div>
  );
};
