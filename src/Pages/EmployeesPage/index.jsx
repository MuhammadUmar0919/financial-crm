// react imports
import React from 'react';
import uuid from 'react-uuid';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// hooks import
import useToken from 'Hooks/UseToken';
// modules import
import CrudModule from 'Modules/CrudModule';
// utils import
import { TimeSleep } from 'Utils/timeSleep';
import { statusAdmins, IconData } from 'Data';
import { ToastPromise } from '@core/components/Downloads/ToastPromise';
import { simpleSchema } from 'Libs/validations';
import StaffForm from 'Modules/FormFields/StaffForm';

const EmployeesPage = () => {
  const navigate = useNavigate();
  const { token } = useToken();
  const [pageData, setPageData] = React.useState([]);
  const { simpleData, loading } = useSelector((state) => state.simpleReducer);
  // const filterData = usersData?.filter((item) => item.createdBy === token.id)
  const getResponse = () => {
    TimeSleep();
    try {
      setPageData(simpleData);
    } catch (error) {
      if (error.response?.status === 500) navigate('/server-error');
      toast.error("Xodimlarni yuklashda muammo bo'ldi");
    }
  };

  React.useEffect(() => {
    getResponse();
  }, [simpleData]);

  const onCreate = (data) => async (dispatch) => {
    dispatch({ type: 'EMPLOYEE_START' });
    const value = {
      ...data,
      id: uuid(),
      createdBy: token.id,
      createdAt: new Date(),
    };
    try {
      await ToastPromise('Employee', 'onCreate', true);
      dispatch({ type: 'EMPLOYEE_SUCCESS', data: value });
      dispatch({ type: 'AUTH_CREATE', data: value });
    } catch (error) {
      dispatch({ type: 'EMPLOYEE_FAIL', data: value });
      if (error.response?.status === 500) navigate('/server-error');
      await ToastPromise('Employee', 'onCreate', false);
    }
  };

  const onEdit = (data) => async (dispatch) => {
    dispatch({ type: 'EMPLOYEE_UPDATING_START' });
    try {
      await ToastPromise('Employee', 'onEdit', true);
      dispatch({ type: 'EMPLOYEE_UPDATING_SUCCESS', data: data });
      dispatch({ type: 'AUTH_UPDATING_SUCCESS', data: data });
    } catch (error) {
      dispatch({ type: 'EMPLOYEE_UPDATING_FAIL' });
      if (error.response?.status === 500) navigate('/server-error');
      await ToastPromise('Employee', 'onEdit', false);
    }
  };

  const onDelete = (id) => async (dispatch) => {
    dispatch({ type: 'EMPLOYEE_START' });
    try {
      await ToastPromise('Employee', 'onDelete', true);
      dispatch({ type: 'EMPLOYEE_DELETE', id: id });
      dispatch({ type: 'AUTH_DELETE', id: id });
    } catch (error) {
      dispatch({ type: 'EMPLOYEE_FAIL' });
      if (error.response?.status === 500) navigate('/server-error');
      await ToastPromise('Employee', 'onDelete', false);
    }
  };

  const columns = [
    { id: 'fullName', label: 'Employee', alignRight: false },
    { id: 'numberOfSales', label: 'Sales number', alignRight: false },
    { id: 'numberOfMeeting', label: 'Meeting number', alignRight: false },
    { id: 'numberOfRejections', label: 'Rejected number', alignRight: false },
    { id: 'createdAt', label: 'Created At', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'action', label: 'Actions', alignRight: false },
  ];

  const initialState = {
    id: '',
    age: '',
    rank: '',
    email: '',
    address: '',
    fullName: '',
    password: '',
    username: '',
    createdAt: '',
    createdBy: '',
    photoName: '',
    contacted: '',
    assignment: [],
    phoneNumber: '',
    numberOfSales: '',
    numberOfMeeting: '',
    roleName: 'Employee',
    numberOfRejections: '',
    status: 'no status yet',
    roleIcon: IconData.employee,
  };

  const tableCell = {
    staff: true,
    status: true,
    viewBtn: true,
    rankBtn: true,
    editBtn: true,
    address: false,
    deadline: true,
    fullName: true,
    contacted: true,
    createBtn: true,
    deleteBtn: true,
    createdAt: true,
    selectIcon: true,
    assignmentBtn: true,
    numberOfSales: true,
    numberOfMeeting: true,
    numberOfRejections: true,
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
    crudForm: StaffForm,
    schema: simpleSchema,
    tableTitle: 'Employees',
    statusData: statusAdmins,
  };

  return <CrudModule config={config} />;
};

export default EmployeesPage;
