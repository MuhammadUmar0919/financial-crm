// react imports
import React from 'react';
// module
import CrudModule from '@/Modules/CrudModule';
// data import
import { useData } from '@/Hooks/useData';
import { serviceSchema } from '@/Libs/validations';
import ServiceForm from '@/Modules/FormFields/ServiceForm';

const Services = () => {
  const { statusData, getStatusData } = useData();

  React.useEffect(() => {
    getStatusData('Service')
  }, []);
  
  const entity = 'services';
  const endpoint = 'services';
  const PANEL_TITLE = 'Service Panel';
  const dataTableTitle = 'Service Lists';
  // const entityDisplayLabels = ['email'];

  const ADD_NEW_ENTITY = 'Add new service';
  const DATATABLE_TITLE = 'Service List';
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

  const searchConfig = {
    displayLabels: ['name', 'surname'],
    searchFields: 'email,name,surname',
    outputValue: '_id',
  };

  const config = {
    entity,
    columns,
    endpoint,
    tableCell,
    statusData,
    PANEL_TITLE,
    ENTITY_NAME,
    searchConfig,
    initialState,
    CREATE_ENTITY,
    UPDATE_ENTITY,
    ADD_NEW_ENTITY, 
    dataTableTitle,
    smallWidth: 450,
    DATATABLE_TITLE,
    schema: serviceSchema,
    crudForm: ServiceForm,
  };

  return <CrudModule config={config} />;
};

export default Services;
