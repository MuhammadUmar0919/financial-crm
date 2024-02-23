// react imports
import React from 'react';
// module
import CrudModule from '@/Modules/CrudModule';
// data import
import { IconData } from '@/Data';
// utils import
import { simpleSchema } from '@/Libs/validations';
import StaffForm from '@/Modules/FormFields/StaffForm';
import { useData } from '@/Hooks/useData';

const AdminPage = () => {
  const { statusData, getStatusData } = useData();

  React.useEffect(() => {
    getStatusData('Admin')
  }, []);

  const initialState = {
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
    viewBtn: false,
    fullName: true,
    createBtn: true,
    createdAt: true,
    statusBtn: false,
    deleteBtn: true,
    phoneNumber: true,
    assignmentBtn: true,
  };
  
  const entity = 'admins';
  const endpoint = 'admins';

  const searchConfig = {
    displayLabels: ['name', 'surname'],
    searchFields: 'email,name,surname',
    outputValue: '_id',
  };

  const PANEL_TITLE = 'Admin Panel';
  const dataTableTitle = 'Admin Lists';
  const entityDisplayLabels = ['email'];

  const ADD_NEW_ENTITY = 'Add new admin';
  const DATATABLE_TITLE = 'Admins List';
  const ENTITY_NAME = 'admin';
  const CREATE_ENTITY = 'Create admin';
  const UPDATE_ENTITY = 'Update admin';
  
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
    crudForm: StaffForm,
    schema: simpleSchema,
  };

  return <CrudModule config={config} />;
};

export default AdminPage;
