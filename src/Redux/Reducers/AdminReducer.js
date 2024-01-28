const initialState = {
  adminData: [],
  error: false,
  loading: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADMIN_START':
      return {
        ...state,
        error: false,
        loading: true,
      };
    case 'ADMIN_SUCCESS':
      return {
        ...state,
        adminData: [...state.adminData, action.data],
        loading: false,
        error: false,
      };
    case 'ADMIN_DELETE':
      return {
        ...state,
        adminData: state.adminData.filter((item) => item.id !== action.id),
        loading: false,
        error: true,
      };
    case 'ADMIN_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'ADMIN_UPDATING_START':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'ADMIN_UPDATING_SUCCESS':
      return {
        ...state,
        adminData: [...state.adminData.filter((item) => item.id !== action.data.id), action.data],
        loading: false,
        error: false,
      };
    case 'ADMIN_UPDATING_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'ADMIN_DISMISS':
      return {
        ...state,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default adminReducer;
