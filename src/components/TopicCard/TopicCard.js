import React from 'react';
import ReactPlayer from 'react-player/lazy';
import avatar from '../../img/avatar.svg';
import comments from '../../img/comment.svg';
import votes from '../../img/vote.svg';
import { getTime, shortNumber } from '../../utils/utils';

export const TopicCard = ({
  index,
  post,
  getVideoUrl,
  handleClick,
  isComments,
}) => {
  return (
    <div key={index} className="topic-box">
      <div className="post-author">
        <img className="avatar" src={avatar} alt="" loading="lazy" />
        <span>{post.author}</span>
        <span>{post.subreddit_name_prefixed}</span>
        <span>{getTime(post.created_utc)}</span>
      </div>

      <h4>{post.title}</h4>

      <div className="topic-content">
        {post.post_hint === 'image' && !post.url.substring(-4).includes('gif') && (
          <div className="img-container">
            <img src={post.url} alt="" loading="lazy" />
          </div>
        )}

        {post.post_hint === 'image' && post.url.substring(-4).includes('gif') && (
          <div className="img-container">
            <img src={post.url} alt="" loading="lazy" type="image/gif" />
          </div>
        )}

        {post.selftext.length > 0 && (
          <p className={!isComments ? 'short' : ''}>{post.selftext}</p>
        )}

        {post.post_hint === 'link' && <a href={post.url}>{post.url}</a>}

        {post.is_video && (
          <div
            className="video-container"
            style={{ '--aspect-ratio': '3 / 4' }}
          >
            <ReactPlayer
              className="react-player"
              url={post.media.reddit_video.dash_url}
              controls={true}
              volume={1}
              width="100%"
              height="100%"
            />
          </div>
        )}

        {post.url.includes('yout') && (
          <div className="yt-container">
            <iframe
              src={getVideoUrl(post.url)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        )}
      </div>
      <div className="info" onClick={() => handleClick(post.permalink, index)}>
        <div className={isComments ? 'comment-info-off' : 'comment-info'}>
          <img src={comments} alt="" />
          <span>{shortNumber(post.num_comments)}</span>
        </div>
        <div className="upvote-info">
          <img src={votes} alt="" />
          <span>{shortNumber(post.ups)}</span>
        </div>
      </div>
    </div>
  );
};
