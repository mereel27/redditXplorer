import React from 'react';
import './Topics.css';
import { TopicCard } from '../TopicCard/TopicCard';
import { useSelector, useDispatch } from 'react-redux';
import { isLoading, selectNextPage, nextPageLoading, fetchNextPage, selectedCategory } from '../../store/redditPost/redditPostSlice';
import { LoadingCard } from '../LoadingCard/LoadingCard';
import { randomNumber } from '../../utils/utils';
import { BottomButtons } from '../../features/BottomButtons/BottomButtons';


export const Topics = ({ posts, handleClick, getVideoUrl }) => {
    const loading = useSelector(isLoading);
    const nextPage = useSelector(selectNextPage);
    const nextLoading = useSelector(nextPageLoading);
    const category = useSelector(selectedCategory);
    const dispatch = useDispatch();

    const handleNextPage = () => {
        dispatch(fetchNextPage({ nextPage, category }));
      };

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
            <BottomButtons 
                loading={nextLoading}
                ready={posts.length > 0}
                isMore={nextPage.length > 0} 
                moreClick={handleNextPage}
            />
        </div>
    )
}
 