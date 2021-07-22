import React, { useEffect } from 'react';
import './Main.css';
import { selectPosts, fetchPosts } from '../store/redditPost/redditPostSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostData, showComments, setPostId } from '../store/redditComments/redditCommentsSlice';
import { Topics } from './Topics/Topics';
import { Comments } from '../store/redditComments/redditComments';
import { selectedCategory } from '../store/redditPost/redditPostSlice';


const Main = ({onClick}) => {
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
        return `https://youtube.com/embed/${link.match(/(https?:\/\/(www\.)?[^ &]*)/)[0].slice(-11)}`
    }

    return (
        <div className ='Main'>
            {/* <div className ='categories'>
                <ul>
                    <li onClick={onClick} id='/r/funny'><i id='funny' class='icon'></i>funny</li>
                    <li onClick={onClick} id='/r/askReddit'><i id='ask' class='icon'></i>AskReddit</li>
                    <li onClick={onClick} id='/r/gaming'><i id='gaming' class='icon'></i>gaming</li>
                    <li onClick={onClick} id='/r/aww'><i id='aww' class='icon'></i>aww</li>
                    <li onClick={onClick} id='/r/pics'><i id='pics' class='icon'></i>pics</li>
                    <li onClick={onClick} id='/r/music'><i id='music' class='icon'></i>Music</li>
                    <li onClick={onClick} id='/r/videos'><i id='videos' class='icon'></i>videos</li>
                </ul>
            </div> */}
            <div className='nav-container'>
                    <nav>
                        <span id='/top' onClick={onClick}>TOP</span>
                        <span id='/r/popular' onClick={onClick}>POPULAR</span>
                        <span id='/r/all' onClick={onClick}>ALL</span>
                        <span id='/new' onClick={onClick}>NEW</span>
                        <span>FAVOURITE</span>
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