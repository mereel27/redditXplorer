import React from 'react';
import './Topics.css';
import { TopicCard } from '../TopicCard/TopicCard';
import { useSelector } from 'react-redux';
import { isLoading } from '../../store/redditPost/redditPostSlice';
import { LoadingCard } from '../LoadingCard/LoadingCard';

export const Topics = ({posts, handleClick, getVideoUrl}) => {
    const loading = useSelector(isLoading);

    const randomNumber = Math.floor(Math.random() * (8-4) + 4);

    return (
        <div className='Topics'>
            {loading ? Array(randomNumber).fill(<LoadingCard />) : posts.map((post, index) => (
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
 