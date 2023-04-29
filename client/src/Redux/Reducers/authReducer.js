import { GLOBALTYPES } from '../Actions/globalTypes';

const initState = { mode: 'light', user: null, token: null };

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.AUTH:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default authReducer;
