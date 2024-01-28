const simpleReducer = (
  state = {
    simpleData: [],
    error: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case 'EMPLOYEE_START':
      return {
        ...state,
        error: false,
        loading: true,
      };
    case 'EMPLOYEE_SUCCESS':
      return {
        ...state,
        simpleData: [...state.simpleData, action.data],
        loading: false,
        error: false,
      };
    case 'EMPLOYEE_DELETE':
      state.simpleData = state.simpleData.filter((item) => item.id !== action.id);
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'EMPLOYEE_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'EMPLOYEE_UPDATING_START':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'EMPLOYEE_UPDATING_SUCCESS':
      state.simpleData = state.simpleData.filter((item) => item.id !== action.data.id);
      return {
        ...state,
        simpleData: [...state.simpleData, action.data],
        loading: false,
        error: false,
      };
    case 'EMPLOYEE_UPDATING_FAIL':
      return {
        ...state,
        loading: true,
        error: true,
      };
    default:
      return state;
  }
};

export default simpleReducer;
