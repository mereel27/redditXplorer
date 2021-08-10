import { decode, getTime } from "../../utils/utils";
import fakeAvatar from "../../img/avatar.webp"

export const Replies = ({replies}) => {
  console.log(replies);
    return (
      replies.map(reply => (
        reply.data.author &&
        <div className='replies'>
          <div className="author-info">
            <img
              className="avatar"
              src={fakeAvatar}
              alt=""
            />
            <span className="author-name">{reply.data.author}</span>
            <div className="separator"></div>
            <span>{getTime(reply.data.created_utc)}</span>
          </div>
          <div className="comment-container">
            <button className="border"></button>
            {reply.data.body_html && <div className='comment-body'dangerouslySetInnerHTML={{__html: decode(reply.data.body_html)}}></div>}
            <div className='comment-info-container'>
              <div className='voting-buttons'>
                <i className="bi bi-chevron-down icon vote-down"></i>
                  <span className='score'>{reply.data.score || 0}</span>
                <i className="bi bi-chevron-up icon vote-up"></i>
              </div>
            </div>
            <div>{reply.data.replies && <Replies replies={reply.data.replies.data.children} />}</div>
          </div>
        </div>
      ))
    );
};