import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPostData } from "../../api/reddit";


const initialState = {
    comments: [],
    avatars: [],
    error: false,
    isLoading: false,
    showComments: false,
    postId: 0
};


export const fetchPostData = createAsyncThunk(
    'redditComments/fetchPostData',
    async (permalink) => await getPostData(permalink)
);


export const redditCommentsSlice = createSlice({
    name: 'redditComments',
    initialState,
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        setShowComments: (state, action) => {
            state.showComments = action.payload;
        },
        setPostId: (state, action) => {
            state.postId = Number(action.payload);
        }
    },
    extraReducers: {
        [fetchPostData.pending]: state => {
            state.isLoading = true;
            state.error = false;
        },
        [fetchPostData.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.comments = action.payload[0];
            state.avatars = action.payload[1];
            state.showComments = true;
        },
        [fetchPostData.rejected]: state => {
            state.isLoading = false;
            state.error = true;
        },
    }
});

export const { setComments, setShowComments, setPostId } = redditCommentsSlice.actions;
export default redditCommentsSlice.reducer;
export const selectAllComments = state => state.redditComments.comments;
export const showComments = state => state.redditComments.showComments;
export const selectPostId = state => state.redditComments.postId;
export const selectAvatars = state => state.redditComments.avatars;