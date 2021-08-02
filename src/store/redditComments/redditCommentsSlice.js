import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPostData, getNextComments } from "../../api/reddit";


const initialState = {
    comments: [],
    nextCommentsList: [],
    nextComments: [],
    avatars: [],
    error: false,
    isLoading: false,
    nextCommentsLoading: false,
    showComments: false,
    postId: 0
};


export const fetchPostData = createAsyncThunk(
    'redditComments/fetchPostData',
    async (permalink) => await getPostData(permalink)
);

export const fetchNextComments = createAsyncThunk(
    'redditComments/fetchNextComments',
    async ({nextComments, permalink}) => await getNextComments(nextComments, permalink)
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
            const index = action.payload[0].length - 1;
            state.nextCommentsList = action.payload[0][index].children || [];
            const commentsToShow = state.nextCommentsList.length > 50 ? 50 : state.nextCommentsList.length;
            state.nextComments = state.nextCommentsList.splice(0, commentsToShow);
        },
        [fetchPostData.rejected]: state => {
            state.isLoading = false;
            state.error = true;
        },
        ///////////////////////////////////
        [fetchNextComments.pending]: state => {
            state.nextCommentsLoading = true;
            state.error = false;
        },
        [fetchNextComments.fulfilled]: (state, action) => {
            state.nextCommentsLoading = false;
            state.error = false;
            state.comments.push(...action.payload[0]);
            state.avatars.push(...action.payload[1]);
            const commentsToShow = state.nextCommentsList.length > 50 ? 50 : state.nextCommentsList.length;
            state.nextComments = state.nextCommentsList.splice(0, commentsToShow);
        },
        [fetchNextComments.rejected]: state => {
            state.nextCommentsLoading = false;
            state.error = true;
        }
    }
});

export const { setComments, setShowComments, setPostId } = redditCommentsSlice.actions;
export default redditCommentsSlice.reducer;
export const selectAllComments = state => state.redditComments.comments;
export const showComments = state => state.redditComments.showComments;
export const isCommentsLoading = state => state.redditComments.isLoading;
export const selectPostId = state => state.redditComments.postId;
export const selectAvatars = state => state.redditComments.avatars;
export const selectNextComments = state => state.redditComments.nextComments;
export const nextCommentsLoading = state => state.redditComments.nextCommentsLoading;