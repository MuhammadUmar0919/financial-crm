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
import { serviceChema } from 'Libs/validations';
import { TimeSleep } from 'Utils/timeSleep';
import ServiceForm from 'Modules/FormFields/ServiceForm';

const Services = () => {
  const { token } = useToken();
  // const dispatch = useDispatch()
  const navigate = useNavigate();
  const [pageData, setPageData] = React.useState([]);

  const { serviceData, loading } = useSelector((state) => state.serviceReducer);
  const getResponse = () => {
    TimeSleep();
    try {
      setPageData(serviceData);
    } catch (error) {
      if (error.response?.status === 500) navigate('/server-error');
      toast.error('There was a problem loading the services');
    }
  };

  React.useEffect(() => {
    try {
      getResponse()
    } catch (error) {
      toast.error('There was a problem loading the services');
    }
  }, [serviceData]);

  const onCreate = (data) => {
    return async (dispatch) => {
      dispatch({ type: 'SERVICE_START' });

      const value = {
        ...data,
        id: uuid(),
        createdBy: token.id,
        createdAt: new Date(),
      };

      try {
        await ToastPromise('Service', 'onCreate', true);
        dispatch({ type: 'SERVICE_SUCCESS', data: value });
      } catch (error) {
        dispatch({ type: 'SERVICE_FAIL' });
        if (error.response?.status === 500) navigate('/server-error');
        await ToastPromise('Service', 'onCreate', false);
      } finally {
        getResponse()
      }
    };
  };

  const onEdit = (data) => {
    return async (dispatch) => {
      dispatch({ type: 'SERVICE_UPDATING_START' });
      try {
        await ToastPromise('Service', 'onEdit', true);
        dispatch({ type: 'SERVICE_UPDATING_SUCCESS', data: data });
      } catch (error) {
        dispatch({ type: 'SERVICE_UPDATING_FAIL' });
        if (error.response?.status === 500) navigate('/server-error');
        await ToastPromise('Service', 'onEdit', false);
      } finally {
        getResponse()
      }
    };
  };

  const onDelete = (id) => {
    return async (dispatch) => {
      dispatch({ type: 'SERVICE_START' });
      try {
        await ToastPromise('Service', 'onDelete', true);
        dispatch({ type: 'SERVICE_DELETE', id: id });
      } catch (error) {
        dispatch({ type: 'SERVICE_FAIL' });
        if (error.response?.status === 500) navigate('/server-error');
        await ToastPromise('Service', 'onDelete', false);
      } finally {
        getResponse()
      }
    };
  };

  const entity = 'service';
  const PANEL_TITLE = 'Service Panel';
  const dataTableTitle = 'Service Lists';
  const entityDisplayLabels = ['email'];

  const ADD_NEW_ENTITY = 'Add new service';
  const DATATABLE_TITLE = 'service List';
  const ENTITY_NAME = 'service';
  const CREATE_ENTITY = 'Create service';
  const UPDATE_ENTITY = 'Update service';

  const initialState = {
    createdBy: '',
    createdAt: '',
    serviceName: '',
    status: 'no status yet',
  };

  const columns = [
    { id: 'serviceName', label: 'Name', alignRight: false },
    { id: 'createdBy', label: 'Created by', alignRight: false },
    { id: 'createdAt', label: 'Created at', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'action', label: 'Actions', alignRight: false },
  ];

  const tableCell = {
    status: true,
    editBtn: true,
    // roleIcon: true,
    createdBy: true,
    createBtn: true,
    createdAt: true,
    serviceName: true,
  };

  const config = {
    onEdit,
    columns,
    loading,
    onCreate,
    onDelete,
    tableCell,
    PANEL_TITLE,
    initialState,
    smallWidth: 450,
    ADD_NEW_ENTITY, 
    tableData: pageData,
    schema: serviceChema,
    crudForm: ServiceForm,
    tableTitle: 'Services',
    statusData: statusAdmins,
  };

  return <CrudModule config={config} />;
};

export default Services;
