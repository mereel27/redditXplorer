import React from 'react';
import './Topics.css';
import { TopicCard } from '../TopicCard/TopicCard';
import { useSelector } from 'react-redux';
import { isLoading } from '../../store/redditPost/redditPostSlice';
import { LoadingCard } from '../LoadingCard/LoadingCard';
import { randomNumber } from '../../utils/utils';


export const Topics = ({posts, handleClick, getVideoUrl}) => {
    const loading = useSelector(isLoading);
    return (
        <div className='Topics'>
            {loading ? Array(randomNumber()).fill(<LoadingCard />) : posts.map((post, index) => (
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
 