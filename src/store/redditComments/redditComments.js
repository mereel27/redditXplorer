import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllComments } from './redditCommentsSlice';
import './redditComments.css';
import { selectPostId, selectAvatars} from './redditCommentsSlice';
import { TopicCard } from '../../components/TopicCard/TopicCard';


export const Comments =  ({posts, getVideoUrl, handleClick, isComments}) => {
    const comments = useSelector(selectAllComments);
    const id = useSelector(selectPostId);
    const avatars = useSelector(selectAvatars);

    return (
        <div className='Comments'>
            <TopicCard 
                post={posts[id]} 
                handleClick={handleClick} 
                getVideoUrl={getVideoUrl}
                isComments={isComments}
            />
            <div className='comments-box'>
                {comments.map((comment, index) => (
                    comment.author &&
                    <div key={index} className='comment'>
                        <div className='author'>
                            <img className='avatar' src={avatars[index] || './img/avatar.svg'} alt=''></img>
                            <span>{comment.author}</span>
                        </div>
                        <p>{comment.body}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}