const viewReducer = (
  state = {
    viewData: {},
    error: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case 'VIEW_START':
      return {
        ...state,
        error: false,
        loading: true,
      };
    case 'VIEW_SUCCESS':
      return {
        ...state,
        viewData: action.data,
        loading: false,
        error: false,
      };
    case 'VIEW_DELETE':
      return {
        ...state,
        viewData: {},
        loading: false,
        error: true,
      };
    case 'VIEW_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'VIEW_UPDATING_START':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'VIEW_UPDATING_SUCCESS':
      state.viewData = state.viewData.filter((item) => item.id !== action.data.id);
      return {
        ...state,
        viewData: [...state.viewData, action.data],
        loading: false,
        error: false,
      };
    case 'VIEW_UPDATING_FAIL':
      return {
        ...state,
        loading: true,
        error: true,
      };
    default:
      return state;
  }
};

export default viewReducer;
