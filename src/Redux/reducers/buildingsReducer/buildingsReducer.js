import {
  //   GET_INIT_PROFILE_SUCCESS,
  //   GET_INIT_PROFILE_REQUEST,
  REQUEST_FAILURE,
  GET_ONE_BUILDING,
  LOADING,
  GET_ONWAIT_BOOKINGS,
  GET_BOOKINGS,
  GET_ONE_SPACE,
} from '../../actions/actions';

const initialStore = {
  loading: false,
  buildingFetchedData: {},
  bulidingFetched_Space: {},
  buildingFetched_Bookings: {},
  bookings: [],
  onWaitBookings: [],
  error: '',
};

export const buildingsReducer = (state = initialStore, action) => {
  switch (action.type) {
    case LOADING: //## APP IS LOADING - THIS ACTION ONLY PUT LOADING TREO OR FALSE
      return {
        ...state,
        loading: action.payload,
      };
    case GET_ONE_BUILDING: //## APP IS LOADING - THIS ACTION ONLY PUT LOADING TREO OR FALSE
      return {
        ...state,
        loading: false,
        buildingFetchedData: action.payload,
        // action?.payload.map((s) =>s?.standByBookings?.map((b) => buildingFetched_Bookings.push(b))
      };
    case GET_ONE_SPACE: //## APP IS LOADING - THIS ACTION ONLY PUT LOADING TREO OR FALSE
      return {
        ...state,
        loading: false,
        bulidingFetched_Space: action.payload,
        // action?.payload.map((s) =>s?.standByBookings?.map((b) => buildingFetched_Bookings.push(b))
      };
    case GET_BOOKINGS: //## APP IS LOADING - THIS ACTION ONLY PUT LOADING TREO OR FALSE
      return {
        ...state,
        loading: false,
        bookings: action.payload.confirmedBookings,
        onWaitBookings: action.payload.onWaitBookings,
        buildingFetched_Bookings: action.payload.onWaitBookings,
      };
    case GET_ONWAIT_BOOKINGS: //## APP IS LOADING - THIS ACTION ONLY PUT LOADING TREO OR FALSE
      return {
        ...state,
        loading: false,
        buildingFetched_Bookings: action.payload,
      };
    case REQUEST_FAILURE: //## APP IS LOADING - THIS ACTION ONLY PUT LOADING TREO OR FALSE
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
