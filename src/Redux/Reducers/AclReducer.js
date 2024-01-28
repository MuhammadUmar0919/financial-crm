const initialState = {
  error: false,
  ability: null,
  loading: false,
};

const aclReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACL_START':
      return {
        ...state,
        error: false,
        loading: true,
      };
    case 'ACL_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        ability: action.data,
      };
    case 'ACL_DELETE':
      return {
        ...state,
        ability: {},
        loading: false,
        error: true,
      };
    case 'ACL_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'ACL_UPDATING_START':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'ACL_UPDATING_SUCCESS':
      return {
        ...state,
        ability: [...state.ability.filter((item) => item.id !== action.data.id), action.data],
        loading: false,
        error: false,
      };
    case 'ACL_UPDATING_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default aclReducer;
