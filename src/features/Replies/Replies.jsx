import { decode, getTime } from "../../utils/utils";
import fakeAvatar from "../../img/avatar.webp"

export const Replies = ({comments, avatars}) => {
    return (
      comments.map((comment, index) => (
        comment.data.author &&
        <div key={index} className="comment">
          <div className="author-info">
            <img
              className="avatar"
              src={avatars[comment.data.author] || fakeAvatar}
              alt=""
            />
            <span className="author-name">{comment.data.author}</span>
            <div className="separator"></div>
            <span>{getTime(comment.data.created_utc)}</span>
          </div>
          <div className="comment-container">
            <button className="border"></button>
            {comment.data.body_html && <div className='comment-body'dangerouslySetInnerHTML={{__html: decode(comment.data.body_html)}}></div>}
            <div className='comment-info-container'>
              <div className='voting-buttons'>
                <i className="bi bi-chevron-down icon vote-down"></i>
                  <span className='score'>{comment.data.score}</span>
                <i className="bi bi-chevron-up icon vote-up"></i>
              </div>
            </div>
            {comment.data.replies && <Replies comments={comment.data.replies.data.children} avatars={avatars}/>}
          </div>
        </div>
      ))
    );
};