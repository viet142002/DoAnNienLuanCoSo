import { GLOBALTYPES } from './globalTypes';
import { imageUpload } from '../../utils/imageUpload';
import {
  postDataAPI,
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from '../../utils/fetchData';
import { createNotify, removeNotify } from './notifyAction';
import { PROFILE_TYPES } from './profileAction';

export const POST_TYPES = {
  CREATE_POST: 'CREATE_POST',
  LOADING_POST: 'LOADING_POST',
  GET_POSTS: 'GET_POSTS',
  UPDATE_POST: 'UPDATE_POST',
  GET_POST: 'GET_POST',
  GET_POSTS_USER: 'GET_POST_USER',
  DELETE_POST: 'DELETE_POST',
};

export const createPost =
  ({ content, images, auth }) =>
  async (dispatch) => {
    let media = [];
    try {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: true },
      });

      if (images.length > 0) media = await imageUpload(images);

      const res = await postDataAPI(
        'posts',
        { content, images: media },
        auth.token
      );

      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: res.data.newPost,
      });
      dispatch({
        type: PROFILE_TYPES.ADD_POST,
        payload: res.data.newPost,
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { newPost: res.data.newPost },
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({
      type: POST_TYPES.LOADING_POST,
      payload: true,
    });

    const res = await getDataAPI('posts', token);
    console.log({ getPosts: res });
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: res.data,
    });

    dispatch({
      type: POST_TYPES.LOADING_POST,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};
export const getPostsUser = (token, id) => async (dispatch) => {
  try {
    dispatch({
      type: POST_TYPES.LOADING_POST,
      payload: true,
    });

    const res = await getDataAPI(`user_posts/${id}`, token);
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: res.data.posts,
    });

    dispatch({
      type: POST_TYPES.LOADING_POST,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const deletePost =
  ({ auth, id }) =>
  async (dispatch) => {
    try {
      dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
      const res = await deleteDataAPI(`post/${id}/delete`, auth.token);
      dispatch({
        type: POST_TYPES.DELETE_POST,
        payload: res.data,
      });
      dispatch({
        type: PROFILE_TYPES.DELETE_POST,
        payload: res.data,
      });
      dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const updatePost =
  ({ auth, images, content, status }) =>
  async (dispatch) => {
    let media = [];
    const imgNewUrl = images.filter((img) => !img.url);
    const imgOldUrl = images.filter((img) => img.url);

    if (
      status.content === content &&
      imgNewUrl.length === 0 &&
      imgOldUrl.length === status.images.length
    )
      return;

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);

      const res = await patchDataAPI(
        `post/${status._id}`,
        {
          content,
          images: [...imgOldUrl, ...media],
        },
        auth.token
      );

      dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const likePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
      await patchDataAPI(`post/${post._id}/like`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unLike =
  ({ post, auth }) =>
  async (dispatch) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    };
    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });

    try {
      const res = await patchDataAPI(
        `post/${post._id}/unlike`,
        null,
        auth.token
      );
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          msg: res.data,
        },
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
