import { SET_CURRENT_PAGE } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
