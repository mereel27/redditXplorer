import React from 'react';
import ReactPlayer from 'react-player/lazy';
import avatar from '../../img/avatar.svg';
import comments from '../../img/comment.svg';
import votes from '../../img/vote.svg';

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
          <ReactPlayer
            className="react-player"
            url={post.media.reddit_video.dash_url}
            controls={true}
            volume={1}
            width="100%"
            height="fit-content"
          />
        )}

        {post.url.includes('yout') && (
          <ReactPlayer
            className="yt-player"
            url={getVideoUrl(post.url)}
            controls={true}
          />
        )}
      </div>
      <div className="info" onClick={() => handleClick(post.permalink, index)}>
        <div className={isComments ? 'comment-info-off' : 'comment-info'}>
          <img src={comments} alt="" />
          <span>{post.num_comments} comments</span>
        </div>
        <div className="upvote-info">
          <img src={votes} alt="" />
          <span>{post.ups} upvotes</span>
        </div>
      </div>
    </div>
  );
};
