// react imports
import React from 'react';
import uuid from 'react-uuid';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// module
import CrudModule from 'Modules/CrudModule';
// data import
import { statusAdmins } from 'Data';
// hooks import
import useToken from 'Hooks/UseToken';
// utils import
import { ToastPromise } from '@core/components/Downloads/ToastPromise';
import { statusChema } from 'Libs/validations';
import { TimeSleep } from 'Utils/timeSleep';
import StatusForm from 'Modules/FormFields/StatusForm';

const StatusPage = () => {
  const { token } = useToken();
  // const dispatch = useDispatch()
  const navigate = useNavigate();
  const [pageData, setPageData] = React.useState([]);

  const { statusData, loading } = useSelector((state) => state.statusReducer);
  const getResponse = () => {
    TimeSleep();
    try {
      setPageData(statusData);
    } catch (error) {
      if (error.response?.status === 500) navigate('/server-error');
      toast.error('There was a problem loading the statuses');
    }
  };

  React.useEffect(() => {
    try {
      getResponse()
    } catch (error) {
      toast.error('There was a problem loading the statuses');
    }
  }, [statusData]);

  const onCreate = (data) => {
    return async (dispatch) => {
      dispatch({ type: 'STATUS_START' });

      const value = {
        ...data,
        id: uuid(),
        createdBy: token.id,
        createdAt: new Date(),
      };

      try {
        await ToastPromise('Status', 'onCreate', true);
        dispatch({ type: 'STATUS_SUCCESS', data: value });
      } catch (error) {
        dispatch({ type: 'STATUS_FAIL' });
        if (error.response?.status === 500) navigate('/server-error');
        await ToastPromise('Status', 'onCreate', false);
      } finally {
        getResponse()
      }
    };
  };

  const onEdit = (data) => {
    return async (dispatch) => {
      dispatch({ type: 'STATUS_UPDATING_START' });
      try {
        await ToastPromise('Status', 'onEdit', true);
        dispatch({ type: 'STATUS_UPDATING_SUCCESS', data: data });
      } catch (error) {
        dispatch({ type: 'STATUS_UPDATING_FAIL' });
        if (error.response?.status === 500) navigate('/server-error');
        await ToastPromise('Status', 'onEdit', false);
      } finally {
        getResponse()
      }
    };
  };

  const onDelete = (id) => {
    return async (dispatch) => {
      dispatch({ type: 'STATUS_START' });
      try {
        await ToastPromise('Status', 'onDelete', true);
        dispatch({ type: 'STATUS_DELETE', id: id });
      } catch (error) {
        dispatch({ type: 'STATUS_FAIL' });
        if (error.response?.status === 500) navigate('/server-error');
        await ToastPromise('Status', 'onDelete', false);
      } finally {
        getResponse()
      }
    };
  };

  const initialState = {
    createdBy: '',
    createdAt: '',
    statusName: '',
    categoryName: '',
  };

  const columns = [
    { id: 'statusName', label: 'Name', alignRight: false },
    { id: 'categoryName', label: 'Category name', alignRight: false },
    { id: 'createdBy', label: 'Created by', alignRight: false },
    { id: 'createdAt', label: 'Created at', alignRight: false },
    { id: 'action', label: 'Actions', alignRight: false },
  ];

  const tableCell = {
    editBtn: true,
    createdBy: true,
    createBtn: true,
    createdAt: true,
    statusName: true,
    categoryName: true,
  };

  const config = {
    onEdit,
    columns,
    loading,
    onCreate,
    onDelete,
    tableCell,
    initialState,
    smallWidth: 450,
    tableData: pageData,
    schema: statusChema,
    crudForm: StatusForm,
    tableTitle: 'Statuses',
    statusData: statusAdmins,
  };

  return <CrudModule config={config} />;
};

export default StatusPage;
