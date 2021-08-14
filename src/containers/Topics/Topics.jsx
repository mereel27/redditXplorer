import React from 'react';
import './Topics.css';
import { TopicCard } from '../../components/TopicCard/TopicCard';
import { useSelector, useDispatch } from 'react-redux';
import {
  isLoading,
  selectNextPage,
  nextPageLoading,
  fetchNextPage,
  selectedCategory,
  fetchNextSearchResults,
  selectIcons
} from '../../features/redditPostSlice/redditPostSlice';
import { LoadingCard } from '../../components/LoadingCard/LoadingCard';
import { randomNumber } from '../../utils/utils';
import { BottomButtons } from '../../components/BottomButtons/BottomButtons';

export const Topics = ({ posts, handleClick }) => {
  const loading = useSelector(isLoading);
  const nextPage = useSelector(selectNextPage);
  const nextLoading = useSelector(nextPageLoading);
  const category = useSelector(selectedCategory);
  const icons = useSelector(selectIcons);
  const dispatch = useDispatch();

  const handleNextPage = () => {
    if (category === 'search') {
      dispatch(fetchNextSearchResults());
    } else {
      dispatch(fetchNextPage({ nextPage, category }));
    }
  };

  return (
    <div className="Topics">
      {loading
        ? Array(randomNumber()).fill(<LoadingCard />)
        : posts.map((post, index) => (
            <TopicCard
              key={index}
              post={post}
              index={index}
              handleClick={handleClick}
              icons={icons}
            />
          ))}
      <BottomButtons
        loading={nextLoading}
        ready={posts.length > 0 && !loading}
        isMore={nextPage.length > 0}
        moreClick={handleNextPage}
      />
    </div>
  );
};
