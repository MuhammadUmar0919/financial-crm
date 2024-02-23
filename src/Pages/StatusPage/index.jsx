// react imports
import React from 'react';
import CrudModule from '@/Modules/CrudModule';
// data import
import { statusSchema } from '@/Libs/validations';
import StatusForm from '@/Modules/FormFields/StatusForm';

const StatusPage = () => {
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

  const entity = 'statuses';
  const endpoint = 'statuses';

  const searchConfig = {
    displayLabels: ['name', 'surname'],
    searchFields: 'email,name,surname',
    outputValue: '_id',
  };

  const PANEL_TITLE = 'Status Panel';
  const dataTableTitle = 'Status Lists';
  // const entityDisplayLabels = ['email'];

  const ADD_NEW_ENTITY = 'Add new status';
  const DATATABLE_TITLE = 'Statuses List';
  const ENTITY_NAME = 'status';
  const CREATE_ENTITY = 'Create status';
  const UPDATE_ENTITY = 'Update status';

  const categoryData = [
    { statusName: 'Admin' },
    { statusName: 'Client' },
    { statusName: 'Invoice' },
    { statusName: 'Service' },
    { statusName: 'Employee' },
  ];
  
  const config = {
    entity,
    columns,
    endpoint,
    tableCell,
    ENTITY_NAME,
    PANEL_TITLE,
    initialState,
    searchConfig,
    UPDATE_ENTITY,
    CREATE_ENTITY,
    dataTableTitle,
    ADD_NEW_ENTITY,
    DATATABLE_TITLE,
    smallWidth: 450,
    schema: statusSchema,
    crudForm: StatusForm,
    tableTitle: 'Statuses',
    statusData: categoryData,
  };

  return <CrudModule config={config} />;
};

export default StatusPage;
