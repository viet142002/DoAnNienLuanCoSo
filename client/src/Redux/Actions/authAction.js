import jwtDecode from 'jwt-decode';
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
        error: error.response.data.msg,
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
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    try {
      const res = await postDataAPI('refresh_token');
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { token: res.data.access_token, user: res.data.user },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  }
};

const checkIsValidToken = (token) => (dispatch) => {
  if (!token) return;
  let decodeToken = jwtDecode(token);
  if (token && decodeToken.exp < new Date() / 1000) {
    dispatch(refreshToken());
  }
};

const logout = (navigate, persistor) => async (dispatch) => {
  try {
    localStorage.clear();
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
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

export { logout, setMode, login, register, refreshToken, checkIsValidToken };
