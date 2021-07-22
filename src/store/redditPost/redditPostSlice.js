import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRedditPosts, getSearchResults } from '../../api/reddit';


const initialState = {
    posts: [],
    error: false,
    isLoading: false,
    searchTerm: '',
    selectedCategory: '/r/popular',
};


export const fetchPosts = createAsyncThunk(
    'reddit/fetchPosts',
    async (category) => await getRedditPosts(category)
);

export const fetchSearchResults = createAsyncThunk(
    'reddit/fetchSearchResults',
    async (term) => await getSearchResults(term)
);


export const redditSlice = createSlice({
    name: 'reddit',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    },
    extraReducers: {
        [fetchPosts.pending]: state => {
            state.isLoading = true;
            state.error = false;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.posts = action.payload;
        },
        [fetchPosts.rejected]: state => {
            state.isLoading = false;
            state.error = true;
        },
        [fetchSearchResults.pending]: state => {
            state.isLoading = true;
            state.error = false;
        },
        [fetchSearchResults.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.posts = action.payload;
        },
        [fetchSearchResults.rejected]: state => {
            state.isLoading = false;
            state.error = true;
        }
    }
});

export const { setPosts, setCategory, setSearchTerm } = redditSlice.actions;
export const selectPosts = state => state.reddit.posts;
export const selectSearchTerm = state => state.reddit.searchTerm;
export const selectedCategory = state => state.reddit.selectedCategory;
export default redditSlice.reducer;