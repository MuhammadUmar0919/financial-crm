const initialState = {
  invoiceData: [],
  error: false,
  loading: false,
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INVOICE_START':
      return {
        ...state,
        error: false,
        loading: true,
      };
    case 'INVOICE_SUCCESS':
      return {
        ...state,
        invoiceData: [...state.invoiceData, action.data],
        loading: false,
        error: false,
      };
    case 'INVOICE_DELETE':
      return {
        ...state,
        invoiceData: state.invoiceData.filter((item) => item.id !== action.id),
        loading: false,
        error: true,
      };
    case 'INVOICE_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'INVOICE_UPDATING_START':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'INVOICE_UPDATING_SUCCESS':
      return {
        ...state,
        invoiceData: [
          ...state.invoiceData.filter((item) => item.id !== action.data.id),
          action.data,
        ],
        loading: false,
        error: false,
      };
    case 'INVOICE_UPDATING_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'INVOICE_DISMISS':
      return {
        ...state,
        invoiceData: [],
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default invoiceReducer;
