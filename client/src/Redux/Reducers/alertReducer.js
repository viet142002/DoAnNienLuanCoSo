import { GLOBALTYPES } from '../Actions/globalTypes';

const initState = {};

const alertReducer = (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.ALERT:
      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;
