// react imports
import React from 'react';
// module
import CrudModule from '@/Modules/CrudModule';
import { Box } from '@mui/material';
import Iconify from '@/@core/components/iconify';
import { useData } from '@/Hooks/useData';

export const initialState = {
  id: '',
  total: '',
  taxes: '',
  billTo: '',
  details: [],
  balance: '', // aniqlanmagan
  dueDate: '',
  subTotal: '',
  shipping: '',
  discount: '',
  createdBy: '',
  issuedDate: new Date(),
  paymentStub: false, // chalasi bor
  paymentTerms: false, // chalasi bor
  paymentMethod: 'Internet Banking',
  clientNotes: { note: true },
};

const InvoicePage = () => {
  const { statusData, getStatusData } = useData();

  React.useEffect(() => {
    getStatusData('Invoice')
  }, []);

  const trendingUp = (
    <Box sx={{ display: 'flex', color: 'action.active' }}>
      <Iconify icon="mdi:trending-up" fontSize={20} />
    </Box>
  );

  const columns = [
    { id: 'id', label: trendingUp, alignRight: false },
    { id: 'billTo', label: 'Customer', alignRight: false },
    { id: 'issuedDate', label: 'Create', alignRight: false },
    { id: 'dueDate', label: 'Due', alignRight: false },
    { id: 'balance', label: 'Balance', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'action', label: 'Actions', alignRight: false },
  ];

  const tableCell = {
    id: true,
    billTo: true,
    status: true,
    status: true,
    dueDate: true,
    viewBtn: true,
    balance: true,
    // createdBy: true,
    issuedDate: true,
    tooltipData: true,
  };

    
  const entity = 'invoices';
  const endpoint = 'invoices';

  const searchConfig = {
    displayLabels: ['name', 'surname'],
    searchFields: 'email,name,surname',
    outputValue: '_id',
  };

  const PANEL_TITLE = 'Invoice Panel';
  const dataTableTitle = 'Invoice Lists';
  const entityDisplayLabels = ['email'];

  const ADD_NEW_ENTITY = 'Add new invoice';
  const DATATABLE_TITLE = 'Invoices List';
  const ENTITY_NAME = 'invoice';
  const CREATE_ENTITY = 'Create invoice';
  const UPDATE_ENTITY = 'Update invoice';
  

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
  };
  
  return <CrudModule config={config} />;
};

export default InvoicePage;
