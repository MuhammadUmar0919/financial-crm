const initialState = {
  error: false,
  serviceData: [],
  loading: false,
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SERVICE_START':
      return {
        ...state,
        error: false,
        loading: true,
      };
    case 'SERVICE_SUCCESS':
      return {
        ...state,
        serviceData: [...state.serviceData, action.data],
        loading: false,
        error: false,
      };
    case 'SERVICE_DELETE':
      return {
        ...state,
        serviceData: state.serviceData.filter((item) => item.id !== action.id),
        loading: false,
        error: true,
      };
    case 'SERVICE_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'SERVICE_UPDATING_START':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'SERVICE_UPDATING_SUCCESS':
      return {
        ...state,
        serviceData: [
          ...state.serviceData.filter((item) => item.id !== action.data.id),
          action.data,
        ],
        loading: false,
        error: false,
      };
    case 'SERVICE_UPDATING_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'SERVICE_DISMISS':
      return {
        ...state,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default serviceReducer;
