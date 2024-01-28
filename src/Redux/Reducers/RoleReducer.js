const roleReducer = (
  state = {
    roleData: [],
    error: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case 'ROLE_START':
      return {
        ...state,
        error: false,
        loading: true,
      };
    case 'ROLE_SUCCESS':
      return {
        ...state,
        roleData: [...state.roleData, ...action.data],
        loading: false,
        error: false,
      };
    case 'ROLE_DELETE':
      state.roleData = state.roleData.filter((item) => item.roleName !== action.data);
      // state.roleData = state.roleData.filter((item) => item.id !== action.id);
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'ROLE_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'ROLE_UPDATING_START':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'ROLE_UPDATING_SUCCESS':
      state.roleData = state.roleData.filter((item) => item.id !== action.data.id);
      return {
        ...state,
        roleData: [...state.roleData, action.data],
        loading: false,
        error: false,
      };
    case 'ROLE_UPDATING_FAIL':
      return {
        ...state,
        loading: true,
        error: true,
      };
    default:
      return state;
  }
};

export default roleReducer;
