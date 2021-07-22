import React, { useEffect } from 'react';
import './Main.css';
import { selectPosts, fetchPosts, fetchSearchResults, setSearchTerm, selectSearchTerm } from '../store/redditPost/redditPostSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostData, showComments, setPostId, setShowComments } from '../store/redditComments/redditCommentsSlice';
import { Topics } from './Topics/Topics';
import { Comments } from '../store/redditComments/redditComments';
import { selectedCategory } from '../store/redditPost/redditPostSlice';


const Main = ({onClick}) => {
    const redditPost = useSelector(selectPosts);
    const dispatch = useDispatch();
    const isComments = useSelector(showComments);
    const category = useSelector(selectedCategory);
    const term = useSelector(selectSearchTerm);

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

    const handleSearch = async (e) => {
        e.preventDefault();
        await dispatch(fetchSearchResults(term));
        dispatch(setShowComments());
    };
    
    const handleChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
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
                        <span id='/top' onClick={onClick}>Top</span>
                        <span id='/r/popular' onClick={onClick}>Popular</span>
                        <span id='/r/all' onClick={onClick}>All</span>
                        <span id='/new' onClick={onClick}>New</span>
                        <span>Favourite</span>
                    </nav>
                </div>

            <div className='search-container'>
            <form onSubmit={handleSearch}>
                <input type='text' placeholder='Search...' onChange={handleChange} value={term} />
                <button type='submit'></button>
            </form>
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