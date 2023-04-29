import { GLOBALTYPES } from '../Actions/globalTypes';

const peerReducer = (state = null, action) => {
  switch (action.type) {
    case GLOBALTYPES.PEER:
      return action.payload;
    default:
      return state;
  }
};

export default peerReducer;
