import { lazy, Suspense } from 'react';
import avatar from '../../img/avatar.webp';
import { getTime, shortNumber, decode, getImgUrls, getVideoUrl } from '../../utils/utils';
import ReactPlayer from 'react-player/file';

export const TopicCard = ({
  index,
  post,
  icons,
  handleClick,
  isComments
}) => {
  const imgClass = isComments ? 'full-img' : 'compact-img';
  const ImageGallery = lazy(() => import('react-image-gallery'));

  return (
    <div key={index} className="topic-box">
      <div className="post-info">
        <img
          className="avatar"
          src={icons[index] || avatar}
          alt=""
          loading="lazy"
        />
        <div className="post-author">
          <div className="reddit-name">{post.subreddit_name_prefixed}</div>
          <div>
            <span>Posted by {post.author}</span>
            <div className="separator"></div>
            <span>{getTime(post.created_utc)}</span>
          </div>
        </div>
      </div>

      <h4 className="post-title">{post.title}</h4>
      {post.link_flair_text && (
        <span className="flair-text">{post.link_flair_text}</span>
      )}
      <div className="topic-content">
        {post.post_hint !== 'link' &&
          !post.is_self &&
          !post.domain.includes('redd.it') && (
            <a
              className="content-link"
              href={post.url}
              target="_blank"
              rel="noreferrer"
            >
              {post.url}
              <i className="bi bi-box-arrow-in-right"></i>
            </a>
          )}
        {post.post_hint === 'image' &&
          post.preview &&
          !post.preview.reddit_video_preview && (
            <div className="img-container">
              <img src={post.url} alt="" loading="lazy" className={imgClass} />
            </div>
          )}
        {post.selftext.length > 0 && (
          <div
            className={!isComments ? 'short' : ''}
            dangerouslySetInnerHTML={{ __html: decode(post.selftext_html) }}
          ></div>
        )}
        {post.post_hint === 'link' && (
          <a
            className="content-link"
            href={post.url}
            target="_blank"
            rel="noreferrer"
          >
            {post.url}
            <i className="bi bi-box-arrow-in-right"></i>
          </a>
        )}

        {post.is_video && post.media && (
          <div
            className="video-container"
            style={{ '--aspect-ratio': '3/4' }}
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
        {!post.media_embed.content &&
          post.preview &&
          post.preview.reddit_video_preview &&
          post.preview.reddit_video_preview.is_gif && (
            <div className="img-container">
              <video
                src={post.preview.reddit_video_preview.fallback_url}
                autoPlay
                muted
                loop
              ></video>
            </div>
          )}

        {!post.domain.includes('yout') &&
          post.media_embed &&
          post.media_embed.content && (
            <div
              className="img-container"
              dangerouslySetInnerHTML={{
                __html: decode(post.media_embed.content),
              }}
            ></div>
          )}

        {post.gallery_data && (
          <div className="img-container">
            <Suspense fallback={<div className="loading img-loading"></div>}>
              <ImageGallery
                items={getImgUrls(post.gallery_data.items, post.media_metadata)}
                lazyLoad={true}
                showIndex={true}
              />
            </Suspense>
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
      <div className="info">
        <div
          className={isComments ? 'comment-info-off' : 'comment-info'}
          onClick={!isComments ? () => handleClick(post.permalink, index) : null}
        >
          <i className="bi bi-chat icon"></i>
          <span>{shortNumber(post.num_comments)}</span>
        </div>
        <div className="upvote-info">
          <i className="bi bi-chevron-down icon vote-down"></i>
          <span>{shortNumber(post.ups)}</span>
          <i className="bi bi-chevron-up icon vote-up"></i>
        </div>
      </div>
    </div>
  );
};
