// react imports
import React from 'react';
import uuid from 'react-uuid';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// module
import CrudModule from 'Modules/CrudModule';
// data import
import { statusAdmins, IconData } from 'Data';
// hooks import
import useToken from 'Hooks/UseToken';
// utils import
import { ToastPromise } from '@core/components/Downloads/ToastPromise';
import { simpleSchema } from 'Libs/validations';
import { TimeSleep } from 'Utils/timeSleep';
import StaffForm from 'Modules/FormFields/StaffForm';

const AdminPage = () => {
  const { token } = useToken();
  // const dispatch = useDispatch()
  const navigate = useNavigate();
  const [pageData, setPageData] = React.useState([]);

  const { adminData, loading } = useSelector((state) => state.adminReducer);

  const getResponse = () => {
    TimeSleep();
    try {
      setPageData(adminData);
    } catch (error) {
      if (error.response?.status === 500) navigate('/server-error');
      toast.error('There was a problem loading the admins');
    }
  };

  React.useEffect(() => {
    getResponse();
  }, [adminData]);

  const onCreate = (data) => {
    return async (dispatch) => {
      dispatch({ type: 'ADMIN_START' });

      const value = {
        ...data,
        id: uuid(),
        createdBy: token.id,
        createdAt: new Date(),
      };

      try {
        await ToastPromise('Admin', 'onCreate', true);
        dispatch({ type: 'ADMIN_SUCCESS', data: value });
        dispatch({ type: 'AUTH_CREATE', data: value });
      } catch (error) {
        dispatch({ type: 'ADMIN_FAIL' });
        if (error.response?.status === 500) navigate('/server-error');
        await ToastPromise('Admin', 'onCreate', false);
      } finally {
        getResponse();
      }
    };
  };

  const onEdit = (data) => {
    return async (dispatch) => {
      dispatch({ type: 'ADMIN_UPDATING_START' });
      try {
        await ToastPromise('Admin', 'onEdit', true);
        dispatch({ type: 'ADMIN_UPDATING_SUCCESS', data: data });
        dispatch({ type: 'AUTH_UPDATING_SUCCESS', data: data });
        getResponse();
      } catch (error) {
        dispatch({ type: 'ADMIN_UPDATING_FAIL' });
        if (error.response?.status === 500) navigate('/server-error');
        await ToastPromise('Admin', 'onEdit', false);
      } finally {
      }
    };
  };

  const onDelete = (id) => {
    return async (dispatch) => {
      dispatch({ type: 'ADMIN_START' });
      try {
        await ToastPromise('Admin', 'onDelete', true);
        dispatch({ type: 'ADMIN_DELETE', id: id });
        dispatch({ type: 'AUTH_DELETE', id: id });
      } catch (error) {
        dispatch({ type: 'ADMIN_FAIL' });
        if (error.response?.status === 500) navigate('/server-error');
        await ToastPromise('Admin', 'onDelete', false);
      } finally {
        getResponse();
      }
    };
  };

  const initialState = {
    id: '',
    age: '',
    rank: '',
    email: '',
    country: '',
    address: '',
    fullName: '',
    username: '',
    password: '',
    createdAt: '',
    photoName: '',
    assignment: [],
    phoneNumber: '+998',
    status: 'no status yet',
    roleIcon: IconData.admin,
    roleName: 'Administrator',
  };

  const columns = [
    { id: 'fullName', label: 'Name', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'phoneNumber', label: 'Phone number', alignRight: false },
    { id: 'createdAt', label: 'Created at', alignRight: false },
    { id: 'address', label: 'Address', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'action', label: 'Actions', alignRight: false },
  ];

  const tableCell = {
    email: true,
    staff: true,
    status: true,
    address: true,
    editBtn: true,
    rankBtn: true,
    viewBtn: true,
    fullName: true,
    createBtn: true,
    createdAt: true,
    statusBtn: true,
    deleteBtn: true,
    phoneNumber: true,
    assignmentBtn: true,
  };

  const config = {
    onEdit,
    columns,
    loading,
    onCreate,
    onDelete,
    tableCell,
    initialState,
    crudForm: StaffForm,
    tableData: pageData,
    tableTitle: 'Admins',
    schema: simpleSchema,
    statusData: statusAdmins,
  };

  return <CrudModule config={config} />;
};

export default AdminPage;
