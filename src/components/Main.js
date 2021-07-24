import React, { useEffect } from 'react';
import './Main.css';
import { selectPosts, fetchPosts } from '../store/redditPost/redditPostSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostData, showComments, setPostId, setShowComments } from '../store/redditComments/redditCommentsSlice';
import { Topics } from './Topics/Topics';
import { Comments } from '../store/redditComments/redditComments';
import { selectedCategory, setCategory } from '../store/redditPost/redditPostSlice';


const Main = () => {
    const redditPost = useSelector(selectPosts);
    const dispatch = useDispatch();
    const isComments = useSelector(showComments);
    const category = useSelector(selectedCategory);

    useEffect(()=> {
        dispatch(fetchPosts(category));
    }, [category, dispatch]);

    const handleCommentsClick = (permalink, index) => {
        if (!isComments) {
            dispatch(setPostId(index));
            dispatch(fetchPostData(permalink));
        } else {
            return;
        }
    }

    const getVideoUrl = (link) => {
        return `https://www.youtube-nocookie.com/embed/${link.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1]}`
    }

    const handleMoreClick = (e) => {
        dispatch(setCategory(e.target.value));
        dispatch(setShowComments(false));
    };

    const handleCategoryClick = (e) => {
        dispatch(setCategory(e.target.id));
        dispatch(setShowComments(false));
    };

    return (
        <div className ='Main'>
            <div className='nav-container'>
                    <nav>
                        <span id='/top' onClick={handleCategoryClick}>Top</span>
                        <span id='/r/popular' onClick={handleCategoryClick}>Popular</span>
                        <span id='/r/all' onClick={handleCategoryClick}>All</span>
                        <span id='/new' onClick={handleCategoryClick}>New</span>

                        <select onChange={handleMoreClick} name='more' id='more' placeholder='More'>
                            <option selected disabled hidden>More</option>
                            <option value='/r/funny'>Funny</option>
                            <option value='/r/askReddit'>Ask</option>
                            <option value='/r/gaming'>Gaming</option>
                            <option value='/r/aww'>Aww</option>
                            <option value='/r/pics'>Pics</option>
                            <option value='/r/music'>Music</option>
                            <option value='/r/videos'>Videos</option>
                        </select>
                    </nav>
                </div>

            <div className='content-box'>
                {isComments ? 
                <Comments 
                    posts={redditPost} 
                    handleClick={handleCommentsClick} 
                    getVideoUrl={getVideoUrl}
                    isComments={isComments}
                /> 
                : 
                <Topics 
                    posts={redditPost} 
                    handleClick={handleCommentsClick} 
                    getVideoUrl={getVideoUrl}
                />}
                


            </div>
            
        </div>
    )
}

export default Main;