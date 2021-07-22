import React from 'react';
import './Topics.css';
import { TopicCard } from '../TopicCard/TopicCard';

export const Topics = ({posts, handleClick, getVideoUrl}) => {
    return (
        <div className='Topics'>
            {posts.map((post, index) => (
                <TopicCard 
                    key={index}
                    post={post} 
                    index={index}
                    handleClick={handleClick}
                    getVideoUrl={getVideoUrl}
                />
            ))}
        </div>
    )
}
 