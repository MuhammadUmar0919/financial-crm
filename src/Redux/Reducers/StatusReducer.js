const initialState = {
  error: false,
  statusData: [],
  loading: false,
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STATUS_START':
      return {
        ...state,
        error: false,
        loading: true,
      };
    case 'STATUS_SUCCESS':
      return {
        ...state,
        statusData: [...state.statusData, action.data],
        loading: false,
        error: false,
      };
    case 'STATUS_DELETE':
      return {
        ...state,
        statusData: state.statusData.filter((item) => item.id !== action.id),
        loading: false,
        error: true,
      };
    case 'STATUS_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'STATUS_UPDATING_START':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'STATUS_UPDATING_SUCCESS':
      return {
        ...state,
        statusData: [...state.statusData.filter((item) => item.id !== action.data.id), action.data],
        loading: false,
        error: false,
      };
    case 'STATUS_UPDATING_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'STATUS_DISMISS':
      return {
        ...state,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default statusReducer;
