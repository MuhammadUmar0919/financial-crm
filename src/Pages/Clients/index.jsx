// react imports
import React from 'react';
// data import
import { IconData } from '@/Data';
// modules import
import CrudModule from '@/Modules/CrudModule';
// component import
import { useData } from '@/Hooks/useData';
import { clientSchema } from '@/Libs/validations';
import ClientForm from '@/Modules/FormFields/ClientForm';

export const initialState = {
  address: '',
  country: '',
  fullName: '',
  photoData: '',
  createdBy: '',
  dateOfSale: '',
  createdDate: '',
  phoneNumber: '+998',
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
  const { statusData, getStatusData } = useData();

  React.useEffect(() => {
    getStatusData('Client')
  }, []);
  
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

  const entity = 'clients';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: 'client',
    DATATABLE_TITLE: 'Clients List',
    ADD_NEW_ENTITY: 'Add new client',
    ENTITY_NAME: 'client',
    UPDATE_ENTITY: 'Update client',
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const tableCell = {
    status: true,
    address: true,
    viewBtn: false,
    editBtn: true,
    country: false,
    fullName: true,
    createBtn: true,
    createdAt: true,
    statusBtn: false,
    deleteBtn: true,
    companyName: true,
    phoneNumber: true,
    meetingPlace: true,
    companyEmail: true,
    modifiedDate: true,
    rejectedReason: true,
  };

  const config = {
    columns,
    tableCell,
    statusData,
    initialState,
    searchConfig,
    ...configPage,
    deleteModalLabels,
    crudForm: ClientForm,
    schema: clientSchema,
  };

  return <CrudModule config={config} />;
};

export default Clients;
