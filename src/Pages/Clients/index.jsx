// react imports
import React from 'react';
import uuid from 'react-uuid';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// data import
import { usersStatus, IconData } from 'Data';

// hooks import
import useToken from 'Hooks/UseToken';

// modules import
import CrudModule from 'Modules/CrudModule';

// component import
import { ToastPromise } from '@core/components/Downloads/ToastPromise';
import { clientSchema } from 'Libs/validations';
import { TimeSleep } from 'Utils/timeSleep';
import ClientForm from 'Modules/FormFields/ClientForm';

export const initialState = {
  id: '',
  address: '',
  country: '',
  fullName: '',
  photoData: '',
  createdBy: '',
  dateOfSale: '',
  createdDate: '',
  phoneNumber: '',
  meetingDate: '',
  companyName: '',
  companyEmail: '',
  meetingPlace: '',
  modifiedDate: '',
  roleName: 'Users',
  rejectedReason: '',
  status: 'no status yet',
  roleIcon: IconData.users,
};

const Clients = () => {
  const navigate = useNavigate();
  const { token } = useToken();
  const [pageData, setPageData] = React.useState([]);
  const { clientsData, loading } = useSelector((state) => state.clientsReducer);
  // const filterData = clientsData?.filter((item) => item.createdBy === token.id)

  const getResponse = () => {
    TimeSleep();
    try {
      setPageData(clientsData);
    } catch (error) {
      if (error.response?.status === 500) navigate('/server-error');
      toast.error('There was a problem loading the clients');
    }
  };

  React.useEffect(() => {
    getResponse();
  }, [clientsData]);

  const onCreate = (data) => {
    return async (dispatch) => {
      dispatch({ type: 'CLIENTS_START' });
      const value = {
        ...data,
        id: uuid(),
        createdBy: token.id,
        createdAt: new Date(),
      };
      try {
        await ToastPromise('Client', 'onCreate', true);
        dispatch({ type: 'CLIENTS_SUCCESS', data: value });
      } catch (error) {
        dispatch({ type: 'CLIENTS_FAIL', data: value });
        if (error.response?.status === 500) navigate('/server-error');
        await ToastPromise('Client', 'onCreate', false);
      } finally {
        getResponse();
      }
    };
  };

  const onEdit = (data) => {
    return async (dispatch) => {
      dispatch({ type: 'CLIENTS_UPDATING_START' });
      try {
        await ToastPromise('Client', 'onEdit', true);
        dispatch({ type: 'CLIENTS_UPDATING_SUCCESS', data: data });
      } catch (error) {
        await ToastPromise('Client', 'onEdit', false);
        dispatch({ type: 'CLIENTS_UPDATING_FAIL' });
        if (error.response?.status === 500) navigate('/server-error');
      } finally {
        getResponse();
      }
    };
  };

  const onDelete = (id) => {
    return async (dispatch) => {
      dispatch({ type: 'CLIENTS_START' });
      try {
        await ToastPromise('Client', 'onDelete', true);
        dispatch({ type: 'CLIENTS_DELETE', id: id });
      } catch (error) {
        dispatch({ type: 'CLIENTS_FAIL' });
        if (error.response?.status === 500) navigate('/server-error');
        await ToastPromise('Client', 'onDelete', false);
      } finally {
        getResponse();
      }
    };
  };

  const columns = [
    { id: 'fullName', label: 'Name', alignRight: false },
    { id: 'companyEmail', label: 'Company email', alignRight: false },
    { id: 'company', label: 'Company', alignRight: false },
    { id: 'phoneNumber', label: 'Phone number', alignRight: false },
    { id: 'createdDate', label: 'Created at', alignRight: false },
    { id: 'country', label: 'Country', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'action', label: 'Actions', alignRight: false },
  ];

  const tableCell = {
    status: true,
    address: true,
    viewBtn: true,
    editBtn: true,
    country: false,
    fullName: true,
    createBtn: true,
    createdAt: true,
    statusBtn: true,
    deleteBtn: true,
    companyName: true,
    phoneNumber: true,
    meetingPlace: true,
    companyEmail: true,
    modifiedDate: true,
    rejectedReason: true,
  };

  const config = {
    onEdit,
    columns,
    loading,
    onCreate,
    onDelete,
    tableCell,
    initialState,
    tableData: pageData,
    crudForm: ClientForm,
    schema: clientSchema,
    tableTitle: 'Clients',
    statusData: usersStatus,
  };

  return <CrudModule config={config} />;
};

export default Clients;
