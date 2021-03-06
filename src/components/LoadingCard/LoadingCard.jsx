import './LoadingCard.css';

export const LoadingCard = ({ isComments }) => {
  return isComments ? (
    <div className="comment">
      <div className="author-info">
        <div className="avatar-loading loading"></div>
        <div className="author-loading loading"></div>
      </div>
      <div className="content loading"></div>
      <div className="content loading"></div>
    </div>
  ) : (
    <div className="topic-box" style={{ padding: '2% 3%' }}>
      <div className="post-info no-margin">
        <div className="avatar-loading loading"></div>
        <div className="author-loading loading"></div>
      </div>

      <div className="title loading"></div>

      <div className="content-loading">
        <div className="content loading"></div>
        <div className="content loading"></div>
        <div className="content loading"></div>
        <div className="content loading"></div>
      </div>

      <div className="info-loading">
        <div className="comment-loading loading"></div>
        <div className="comment-loading loading"></div>
      </div>
    </div>
  );
};
