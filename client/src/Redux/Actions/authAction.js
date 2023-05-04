import { postDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from './globalTypes';

const setMode = (mode) => (dispatch) => {
  dispatch({
    type: GLOBALTYPES.AUTH,
    payload: { mode: mode === 'light' ? 'dark' : 'light' },
  });
};

const login = (data) => async (dispatch) => {
  try {
    //enable loading...
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI('login', data);
    localStorage.setItem('firstLogin', true);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: res.data.access_token, user: res.data.user },
    });
    //loading success
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.error,
      },
    });
  }
};

const register = (data, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { loading: true },
    });
    const res = await postDataAPI('register', data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.msg },
    });

    navigate('/');
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem('firstLogin');
  if (firstLogin) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { loading: true, refreshToken: 'first' },
    });

    try {
      const res = await postDataAPI('refresh_token');

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: false, refreshToken: 'true' },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.error,
          refreshToken: 'last',
        },
      });
    }
  }
};

const logout = (navigate) => async (dispatch) => {
  try {
    localStorage.clear();
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { user: null, token: null },
    });
    await postDataAPI('logout');
    navigate('/');
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export { logout, setMode, login, register, refreshToken };
