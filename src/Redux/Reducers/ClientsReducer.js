const clientsReducer = (
  state = {
    clientsData: [],
    error: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case 'CLIENTS_START':
      return {
        ...state,
        error: false,
        loading: true,
      };
    case 'CLIENTS_SUCCESS':
      return {
        ...state,
        clientsData: [...state.clientsData, action.data],
        loading: false,
        error: false,
      };
    case 'CLIENTS_DELETE':
      state.clientsData = state.clientsData.filter((item) => item.id !== action.id);
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'CLIENTS_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'CLIENTS_UPDATING_START':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'CLIENTS_UPDATING_SUCCESS':
      state.clientsData = state.clientsData.filter((item) => item.id !== action.data.id);
      return {
        ...state,
        clientsData: [...state.clientsData, action.data],
        loading: false,
        error: false,
      };
    case 'CLIENTS_UPDATING_FAIL':
      return {
        ...state,
        loading: true,
        error: true,
      };
    default:
      return state;
  }
};

export default clientsReducer;
