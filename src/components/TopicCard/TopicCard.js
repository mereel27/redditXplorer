import React from 'react';
import ReactPlayer from 'react-player/lazy';
import avatar from '../../img/avatar.svg';
import comments from '../../img/comment.svg';
import votes from '../../img/vote.svg';
import { getTime, shortNumber, decode } from '../../utils/utils';


export const TopicCard = ({
  index,
  post,
  getVideoUrl,
  handleClick,
  isComments,
}) => {
  
  const imgClass = isComments ? 'full-img' : 'compact-img';

  return (
    <div key={index} className="topic-box">
      <div className="post-author">
        <img className="avatar" src={avatar} alt="" loading="lazy" />
        <span>{post.author}</span>
        <div className="separator"></div>
        <span>{post.subreddit_name_prefixed}</span>
        <div className="separator"></div>
        <span>{getTime(post.created_utc)}</span>
      </div>

      <h4 className="post-title">{post.title}</h4>
      {post.link_flair_text && <div className='flair-text'>{post.link_flair_text}</div>}
      <div className="topic-content">
        {post.post_hint === 'image' && !post.url.substring(-4).includes('gif') && (
          <div className="img-container">
            <img src={post.url} alt="" loading="lazy" className={imgClass}/>
          </div>
        )}

        {post.post_hint === 'image' && post.url.substring(-4).includes('gif') && (
          <div className="img-container">
            <img src={post.url} alt="" loading="lazy" type="image/gif" className={imgClass}/>
          </div>
        )}

        {post.selftext.length > 0 && (
          <div className={!isComments ? 'short' : ''} dangerouslySetInnerHTML={{__html: decode(post.selftext_html)}}></div>
        )}

        {post.post_hint === 'link' && <a href={post.url} target="_blank" rel="noreferrer">{post.url}</a>}

        {post.is_video && (
          <div
            className="video-container"
            style={{ '--aspect-ratio': '3 / 4' }}
          >
            <ReactPlayer
              className="react-player"
              url={post.media.reddit_video.hls_url}
              controls={true}
              volume={1}
              width="100%"
              height="100%"
            />
          </div>
        )}

        {post.domain.includes('yout') && (
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
