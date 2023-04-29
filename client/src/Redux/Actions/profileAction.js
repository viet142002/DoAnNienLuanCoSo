import { GLOBALTYPES, DeleteData } from './globalTypes';
import { getDataAPI, patchDataAPI } from '../../utils/fetchData';
import { imageUpload } from '../../utils/imageUpload';
import { createNotify, removeNotify } from '../Actions/notifyAction';
import { GlobalStyles } from '@mui/material';
import { POST_TYPES, getPostsUser } from './postAction';

export const PROFILE_TYPES = {
  LOGOUT: 'LOGOUT',
  LOADING: 'LOADING_PROFILE',
  GET_USER: 'GET_PROFILE_USER',
  FOLLOW: 'FOLLOW',
  UNFOLLOW: 'UNFOLLOW',
  GET_POSTS: 'GET_PROFILE_POSTS',
  ADD_POST: 'ADD_POST_IN_PROFILE',
  DELETE_POST: 'DELETE_POST_IN_PROFILE',
  UPDATE_POST: 'UPDATE_PROFILE_POST',
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
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const updateProfileUser =
  ({ userData, avatar, auth }) =>
  async (dispatch) => {
    try {
      let media;
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      console.log(avatar);
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

// export const follow =
// ({ users, user, auth, socket }) =>
// async (dispatch) => {
//   let newUser;

//   if (users.every((item) => item._id !== user._id)) {
//     newUser = { ...user, followers: [...user.followers, auth.user] };
//   } else {
//     users.forEach((item) => {
//       if (item._id === user._id) {
//         newUser = { ...item, followers: [...item.followers, auth.user] };
//       }
//     });
//   }

//   dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser });

//   dispatch({
//     type: GLOBALTYPES.AUTH,
//     payload: {
//       ...auth,
//       user: { ...auth.user, following: [...auth.user.following, newUser] },
//     },
//   });

//   try {
//     const res = await patchDataAPI(
//       `user/${user._id}/follow`,
//       null,
//       auth.token
//     );
//     socket.emit('follow', res.data.newUser);

//     // Notify
//     const msg = {
//       id: auth.user._id,
//       text: 'has started to follow you.',
//       recipients: [newUser._id],
//       url: `/profile/${auth.user._id}`,
//     };

//     dispatch(createNotify({ msg, auth, socket }));
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: { error: err.response.data.msg },
//     });
//   }
// };

// export const unfollow =
//   ({ users, user, auth, socket }) =>
//   async (dispatch) => {
//     let newUser;

//     if (users.every((item) => item._id !== user._id)) {
//       newUser = {
//         ...user,
//         followers: DeleteData(user.followers, auth.user._id),
//       };
//     } else {
//       users.forEach((item) => {
//         if (item._id === user._id) {
//           newUser = {
//             ...item,
//             followers: DeleteData(item.followers, auth.user._id),
//           };
//         }
//       });
//     }

//     dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser });

//     dispatch({
//       type: GLOBALTYPES.AUTH,
//       payload: {
//         ...auth,
//         user: {
//           ...auth.user,
//           following: DeleteData(auth.user.following, newUser._id),
//         },
//       },
//     });

//     try {
//       const res = await patchDataAPI(
//         `user/${user._id}/unfollow`,
//         null,
//         auth.token
//       );
//       socket.emit('unFollow', res.data.newUser);

//       // Notify
//       const msg = {
//         id: auth.user._id,
//         text: 'has started to follow you.',
//         recipients: [newUser._id],
//         url: `/profile/${auth.user._id}`,
//       };

//       dispatch(removeNotify({ msg, auth, socket }));
//     } catch (err) {
//       dispatch({
//         type: GLOBALTYPES.ALERT,
//         payload: { error: err.response.data.msg },
//       });
//     }
//   };
