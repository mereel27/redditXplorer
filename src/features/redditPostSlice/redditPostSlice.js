import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRedditPosts, getSearchResults, getNextPage, getSubredditIcons, getNextSearchResults } from '../../api/reddit';


const initialState = {
    posts: [],
    error: false,
    isLoading: false,
    nextPageLoading: false,
    searchTerm: '',
    searchURL: '',
    selectedCategory: '/top',
    nextPage: '',
    icons: []
};


export const fetchPosts = createAsyncThunk(
    'reddit/fetchPosts',
    async (category) => {
        const data = await getRedditPosts(category);
        const icons = await getSubredditIcons(data[0]);
        return  { data, icons };
    }
);

export const fetchNextPage = createAsyncThunk(
    'reddit/fetchNextPage',
    async ({ nextPage, category }) => {
        const data = await getNextPage(nextPage, category);
        const icons = await getSubredditIcons(data[0]);
        return  { data, icons };
    }
)

export const fetchSearchResults = createAsyncThunk(
    'reddit/fetchSearchResults',
    async (term) => {
        const data = await getSearchResults(term);
        const icons = await getSubredditIcons(data[0]);
        return  { data, icons };
    }
);

export const fetchNextSearchResults = createAsyncThunk(
    'reddit/fetchNextSearchResults',
    async (_, { getState }) => {
       const data = await getNextSearchResults(getState().reddit.searchURL, getState().reddit.nextPage);
       const icons = await getSubredditIcons(data[0]);
       return { data, icons };
    }
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
            state.posts = action.payload.data[0];
            state.nextPage = action.payload.data[1];
            state.icons = action.payload.icons;
            state.isLoading = false;
            state.error = false;
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
            state.posts = action.payload.data[0];
            state.nextPage = action.payload.data[1];
            state.icons = action.payload.icons;
            state.searchURL = state.searchTerm;
            state.searchTerm = '';
            state.isLoading = false;
            state.error = false;
        },
        [fetchSearchResults.rejected]: state => {
            state.isLoading = false;
            state.error = true;
        },
        [fetchNextPage.pending]: state => {
            state.nextPageLoading = true;
            state.error = false;
        },
        [fetchNextPage.fulfilled]: (state, action) => {
            state.posts.push(...action.payload.data[0]);
            state.nextPage = action.payload.data[1];
            state.icons.push(...action.payload.icons);
            state.nextPageLoading = false;
            state.error = false;
        },
        [fetchNextPage.rejected]: state => {
            state.nextPageLoading = false;
            state.error = true;
        },
        [fetchNextSearchResults.pending]: state => {
            state.nextPageLoading = true;
            state.error = false;
        },
        [fetchNextSearchResults.fulfilled]: (state, action) => {
            state.posts.push(...action.payload.data[0]);
            state.nextPage = action.payload.data[1];
            state.icons.push(...action.payload.icons);
            state.nextPageLoading = false;
            state.error = false;
        },
        [fetchNextSearchResults.rejected]: state => {
            state.nextPageLoading = false;
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
export const nextPageLoading = state => state.reddit.nextPageLoading;
export const selectIcons = state => state.reddit.icons;
export default redditSlice.reducer;