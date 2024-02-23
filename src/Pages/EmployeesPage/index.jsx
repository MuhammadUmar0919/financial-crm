// react imports
import React from 'react';
// modules import
import CrudModule from '@/Modules/CrudModule';
// utils import
import { IconData } from '@/Data';
import { useData } from '@/Hooks/useData';
import { simpleSchema } from '@/Libs/validations';
import StaffForm from '@/Modules/FormFields/StaffForm';

const EmployeesPage = () => {
  const { statusData, getStatusData } = useData();

  React.useEffect(() => {
    getStatusData('Employee')
  }, []);
  
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

  const entity = 'employees';
  const endpoint = 'employees';

  const searchConfig = {
    displayLabels: ['name', 'surname'],
    searchFields: 'email,name,surname',
    outputValue: '_id',
  };

  const PANEL_TITLE = 'Admin Panel';
  const dataTableTitle = 'Admin Lists';
  const entityDisplayLabels = ['email'];

  const ADD_NEW_ENTITY = 'Add new employee';
  const DATATABLE_TITLE = 'Employees List';
  const ENTITY_NAME = 'admin';
  const CREATE_ENTITY = 'Create employee';
  const UPDATE_ENTITY = 'Update employee';

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
    dataTableTitle,
    ADD_NEW_ENTITY,
    DATATABLE_TITLE,
    entityDisplayLabels,
    crudForm: StaffForm,
    schema: simpleSchema,
    tableTitle: 'Employees',
  };

  return <CrudModule config={config} />;
};

export default EmployeesPage;
