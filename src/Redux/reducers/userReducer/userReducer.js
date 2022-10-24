import {
  REQUEST_FAILURE,
  GET_MY_USER,
  LOADING,
  GET_MY_NOTIFICATIONS,
  CHANGE_THEME,
} from '../../actions/actions';

const initialStore = {
  loading: false,
  darkOn: false, //false for 'light' or true for 'dark'
  myUserInformation: {},
  allNotifications: [],
  pageData: {
    page: 1,
    hasNextPage: false,
  },
  error: '',
};

export const userReducer = (state = initialStore, action) => {
  switch (action.type) {
    case LOADING: //## APP IS LOADING - THIS ACTION ONLY PUT LOADING TREO OR FALSE
      return {
        ...state,
        loading: action.payload,
      };
    case CHANGE_THEME: //## APP IS LOADING - THIS ACTION ONLY PUT LOADING TREO OR FALSE
      return {
        ...state,
        darkOn: action.payload,
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
        pageData: action.payload.pageData,
        allNotifications: action.payload.notifications,
      };
    default:
      return state;
  }
};
