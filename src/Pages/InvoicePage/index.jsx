// react imports
import React from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// module
import CrudModule from 'Modules/CrudModule';
// data import
import { statusInvoice } from 'Data';
// hooks import
import useToken from 'Hooks/UseToken';
// utils import
import { ToastPromise } from '@core/components/Downloads/ToastPromise';
import { Box } from '@mui/material';
import Iconify from 'Components/Iconify';

export const initialState = {
  id: '',
  total: '',
  taxes: '',
  billTo: '',
  details: [],
  balance: '', // aniqlanmagan
  dueDate: '',
  subTotal: '',
  shipping: '',
  discount: '',
  createdBy: '',
  issuedDate: new Date(),
  paymentStub: false, // chalasi bor
  paymentTerms: false, // chalasi bor
  paymentMethod: 'Internet Banking',
  clientNotes: { note: true },
};

const InvoicePage = () => {
  const { token } = useToken();
  // const dispatch = useDispatch()
  const navigate = useNavigate();
  const [pageData, setPageData] = React.useState([]);

  const { invoiceData, loading } = useSelector((state) => state.invoiceReducer);

  React.useEffect(() => {
    try {
      setPageData(invoiceData);
    } catch (error) {
      if (error.response?.status === 500) navigate('/server-error');
      toast.error('There was a problem loading the invoices');
    }
  }, [invoiceData]);

  const onCreate = (data) => {
    return async (dispatch) => {
      dispatch({ type: 'INVOICE_START' });

      try {
        await ToastPromise('Invoice', 'onCreate', true);
        dispatch({ type: 'INVOICE_SUCCESS', data: data });
      } catch (error) {
        dispatch({ type: 'AINVOICE_FAIL' });
        if (error.response?.status === 500) navigate('/server-error');
        await ToastPromise('Invoice', 'onCreate', false);
      }
    };
  };

  const onEdit = (data) => {
    return async (dispatch) => {
      dispatch({ type: 'INVOICE_UPDATING_START' });
      try {
        await ToastPromise('Invoice', 'onEdit', true);
        dispatch({ type: 'INVOICE_UPDATING_SUCCESS', data: data });
      } catch (error) {
        dispatch({ type: 'INVOICE_UPDATING_FAIL' });
        if (error.response?.status === 500) navigate('/server-error');
        await ToastPromise('Invoice', 'onEdit', false);
      }
    };
  };

  const onDelete = (id) => {
    return async (dispatch) => {
      dispatch({ type: 'INVOICE_START' });
      try {
        await ToastPromise('Invoice', 'onDelete', true);
        dispatch({ type: 'INVOICE_DELETE', id: id });
      } catch (error) {
        dispatch({ type: 'INVOICE_FAIL' });
        if (error.response?.status === 500) navigate('/server-error');
        await ToastPromise('Invoice', 'onDelete', false);
      }
    };
  };

  const trendingUp = (
    <Box sx={{ display: 'flex', color: 'action.active' }}>
      <Iconify icon="mdi:trending-up" fontSize={20} />
    </Box>
  );

  const columns = [
    { id: 'id', label: trendingUp, alignRight: false },
    { id: 'billTo', label: 'Customer', alignRight: false },
    { id: 'issuedDate', label: 'Create', alignRight: false },
    { id: 'dueDate', label: 'Due', alignRight: false },
    { id: 'balance', label: 'Balance', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'action', label: 'Actions', alignRight: false },
  ];

  const tableCell = {
    id: true,
    billTo: true,
    status: true,
    status: true,
    dueDate: true,
    viewBtn: true,
    balance: true,
    issuedDate: true,
    tooltipData: true,
  };

  const config = {
    onEdit,
    columns,
    loading,
    tableTitle: 'Invoice',
    onCreate,
    onDelete,
    tableData: pageData,
    tableCell,
    statusData: statusInvoice,
    initialState,
  };
  
  return <CrudModule config={config} />;
};

export default InvoicePage;
