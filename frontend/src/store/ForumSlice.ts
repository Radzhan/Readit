import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/srote";
import axiosApi from "../axiosApi";
import { Comment, commentSet, Post, PostSet } from "../types";

interface forumState {
  postArray: Post[];
  post: Post;
  commentArray: Comment[]
}

const initialState: forumState = {
  postArray: [],
  commentArray: [],
  post: {
    datetime: "",
    title: "",
    image: "",
    _id: "",
    description: '',
  },
};

export const getPosts = createAsyncThunk<Post[]>("forum/getPosts", async () => {
  const getPosts = await axiosApi.get("/posts");

  return getPosts.data;
});

export const getOnePosts = createAsyncThunk<Post, string>("forum/getOnePosts", async (arg) => {
  const getPosts = await axiosApi.get("/posts/" + arg);

  return getPosts.data;
});

export const addPost = createAsyncThunk<void, PostSet, { state: RootState }>(
  "forum/addPost",
  async (arg, { getState }) => {
    const user = getState().users.user;
    if (user) {
      await axiosApi.post("/posts", arg, {
        headers: { Authorization: user.token },
      });
    }
  }
);

export const addComment = createAsyncThunk<
  void,
  commentSet,
  { state: RootState }
>("forum/addPost", async (arg, { getState }) => {
  const user = getState().users.user;

  if (user) {
    await axiosApi.post("/comments/" + arg.id, arg, {
      headers: { Authorization: user.token },
    });
  }
});

export const getComments = createAsyncThunk<Comment[] ,string>("forum/getComments", async (arg) => {
  const getPosts = await axiosApi.get("/comments/" + arg);

  return getPosts.data;
});


export const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.postArray = action.payload;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.commentArray = action.payload;
    });
    builder.addCase(getOnePosts.fulfilled, (state, action) => {
      state.post = action.payload;
    })
  },
});

export const forumReducer = forumSlice.reducer;
export const postArray = (state: RootState) => state.forum.postArray;
export const commentsArray = (state: RootState) => state.forum.commentArray;
export const PostOne = (state: RootState) => state.forum.post;
