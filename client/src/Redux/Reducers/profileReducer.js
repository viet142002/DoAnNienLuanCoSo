import { PROFILE_TYPES } from '../Actions/profileAction';

const initialState = {
  loading: false,
  user: {},
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.LOGOUT:
      return {};
    case PROFILE_TYPES.GET_USER:
      return { ...state, user: action.payload };
    case PROFILE_TYPES.LOADING:
      return { ...state, loading: action.payload };
    case PROFILE_TYPES.FOLLOW:
      console.log(state);
      return {
        ...state,
        user: {
          ...state.user,
          followers: [...state.user.followers, action.payload],
        },
      };
    case PROFILE_TYPES.UNFOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          followers: action.payload,
        },
      };
    default:
      return state;
  }
};
export default profileReducer;
