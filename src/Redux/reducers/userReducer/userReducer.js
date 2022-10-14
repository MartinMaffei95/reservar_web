import {
  REQUEST_FAILURE,
  GET_MY_USER,
  LOADING,
  GET_MY_NOTIFICATIONS,
} from '../../actions/actions';

const initialStore = {
  loading: false,
  myUserInformation: {},
  notifications: [],
  error: '',
};

export const userReducer = (state = initialStore, action) => {
  switch (action.type) {
    case LOADING: //## APP IS LOADING - THIS ACTION ONLY PUT LOADING TREO OR FALSE
      return {
        ...state,
        loading: action.payload,
      };
    case GET_MY_USER: //## APP IS LOADING - THIS ACTION ONLY PUT LOADING TREO OR FALSE
      return {
        ...state,
        loading: false,
        myUserInformation: action.payload,
      };
    case REQUEST_FAILURE: //## APP IS LOADING - THIS ACTION ONLY PUT LOADING TREO OR FALSE
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_MY_NOTIFICATIONS: //## APP IS LOADING - THIS ACTION ONLY PUT LOADING TREO OR FALSE
      return {
        ...state,
        notifications: action.payload,
      };
    default:
      return state;
  }
};
