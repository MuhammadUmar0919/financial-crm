const permissionReducer = (
  state = {
    permissionData: [],
    error: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case 'PERMISSION_START':
      return {
        ...state,
        error: false,
        loading: true,
      };
    case 'PERMISSION_SUCCESS':
      return {
        ...state,
        error: false,
        loading: false,
        permissionData: [...state.permissionData, action.data],
      };
    case 'PERMISSION_SUCCESS_ASSIGNED':
      return {
        ...state,
        error: false,
        loading: false,
        permissionData: [...action.data],
      };
    case 'PERMISSION_DELETE':
      return {
        ...state,
        error: true,
        loading: false,
        permissionData: state.permissionData.filter((item) => item.id !== action.id),
      };
    case 'PERMISSION_DELETE_ASSIGNED':
      return {
        ...state,
        error: true,
        loading: false,
        permissionData: state.permissionData.filter(
          (item) => !item.assignedTo.includes(action.role)
        ),
      };
    case 'PERMISSION_FAIL':
      return {
        ...state,
        error: true,
        loading: false,
      };
    case 'PERMISSION_UPDATING_START':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'PERMISSION_UPDATING_SUCCESS':
      const updatedData = state.permissionData.filter((item) => item.id !== action.data.id);
      return {
        ...state,
        error: false,
        loading: false,
        permissionData: [...updatedData, action.data],
      };
    case 'PERMISSION_UPDATING_FAIL':
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};

export default permissionReducer;
