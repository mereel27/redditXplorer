import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRedditPosts, getSearchResults, getNextPage } from '../../api/reddit';


const initialState = {
    posts: [],
    error: false,
    isLoading: false,
    nextLoading: false,
    searchTerm: '',
    selectedCategory: '/r/popular',
    nextPage: ''
};


export const fetchPosts = createAsyncThunk(
    'reddit/fetchPosts',
    async (category) => await getRedditPosts(category)
);

export const fetchSearchResults = createAsyncThunk(
    'reddit/fetchSearchResults',
    async (term) => await getSearchResults(term)
);

export const fetchNextPage = createAsyncThunk(
    'reddit/fetchNextPage',
    async ({nextPage, category}) => await getNextPage(nextPage, category)
)


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
            state.posts = action.payload[0];
            state.nextPage = action.payload[1];
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
            state.searchTerm = '';
        },
        [fetchSearchResults.rejected]: state => {
            state.isLoading = false;
            state.error = true;
        },
        [fetchNextPage.pending]: state => {
            state.nextLoading = true;
            state.error = false;
        },
        [fetchNextPage.fulfilled]: (state, action) => {
            state.nextLoading = false;
            state.error = false;
            state.posts.push(...action.payload[0]);
            state.nextPage = action.payload[1];
        },
        [fetchNextPage.rejected]: state => {
            state.nextLoading = false;
            state.error = true;
        }
    }
});

export const { setPosts, setCategory, setSearchTerm } = redditSlice.actions;
export const selectPosts = state => state.reddit.posts;
export const selectSearchTerm = state => state.reddit.searchTerm;
export const selectedCategory = state => state.reddit.selectedCategory;
export const isLoading = state => state.reddit.isLoading;
export const selectNextPage = state => state.reddit.nextPage;
export const nextLoading = state => state.reddit.nextLoading;
export default redditSlice.reducer;