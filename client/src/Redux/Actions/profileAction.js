import { GLOBALTYPES, DeleteData } from './globalTypes';
import { getDataAPI, patchDataAPI } from '../../utils/fetchData';
import { imageUpload } from '../../utils/imageUpload';
import { getPostsUser } from './postAction';

export const PROFILE_TYPES = {
  LOGOUT: 'LOGOUT',
  LOADING: 'LOADING_PROFILE',
  GET_USER: 'GET_PROFILE_USER',
  FOLLOW: 'FOLLOW',
  UNFOLLOW: 'UNFOLLOW',
};

export const getProfileUsers = (id, auth) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
    const res = await getDataAPI(`user/${id}`, auth.token);

    dispatch(getPostsUser(auth.token, id));

    dispatch({
      type: PROFILE_TYPES.GET_USER,
      payload: res.data.user,
    });

    dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.error },
    });
  }
};

export const updateProfileUser =
  ({ userData, avatar, auth }) =>
  async (dispatch) => {
    try {
      let media;
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (avatar) media = await imageUpload([avatar]);

      const res = await patchDataAPI(
        'user',
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
        auth.token
      );
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            userName: `${userData.firstName}${userData.lastName}`
              .toLowerCase()
              .replace(/ /g, ''),
            avatar: avatar ? media[0].url : auth.user.avatar,
          },
        },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const follow =
  ({ user, auth }) =>
  async (dispatch) => {
    let newUser = { ...user, followers: [...user.followers, auth.user] };

    dispatch({
      type: PROFILE_TYPES.GET_USER,
      payload: user,
    });
    //Thêm follower cho profile người dùng hiện hành
    dispatch({
      type: PROFILE_TYPES.FOLLOW,
      payload: auth.user,
    });

    // Thêm following cho người dùng hiện hành
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      },
    });

    try {
      const res = await patchDataAPI(
        `user/${user._id}/follow`,
        null,
        auth.token
      );
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { msg: res.data.msg },
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const unFollow =
  ({ user, auth }) =>
  async (dispatch) => {
    dispatch({
      type: PROFILE_TYPES.GET_USER,
      payload: user,
    });
    dispatch({
      type: PROFILE_TYPES.UNFOLLOW,
      payload: DeleteData(user.followers, auth.user._id),
    });

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: DeleteData(auth.user.following, user._id),
        },
      },
    });

    try {
      const res = await patchDataAPI(
        `user/${user._id}/unfollow`,
        null,
        auth.token
      );
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { msg: res.data.msg },
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
