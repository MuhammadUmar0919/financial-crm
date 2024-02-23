import React from 'react';
import instance from '@/Api/Config';
import useToken from '@/Hooks/useToken';

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
  const { token } = useToken();
  const [statusData, setStatus] = React.useState([]);
  const [allEmployee, setAllEmployee] = React.useState([]);

  const getStatusData = async (categoryName) => {
    try {
      const response = await instance.get(`/statuses?categoryName=${categoryName}`);
      setStatus(response.data);
    } catch (error) {
      console.error('Error fetching status data:', error);
    }
  };

  const getAdminsData = async () => {
    try {
      const response = await instance.get('admins');
      setAllEmployee((prevSimpleData) => [...prevSimpleData, ...response.data]);
    } catch (error) {
      console.error('Error fetching admins data:', error);
    }
  };

  const getEmployeesData = async () => {
    try {
      const response = await instance.get('employees');
      setAllEmployee((prevSimpleData) => [...prevSimpleData, ...response.data]);
    } catch (error) {
      console.error('Error fetching employees data:', error);
    }
  };

  const getUserData = (userId) => {
    const userData = [...allEmployee, token].find(({ portId }) => portId === userId);
    return userData;
  };

  React.useEffect(() => {
    getStatusData();
    getAdminsData();
    getEmployeesData();
  }, []);

  const value = {
    statusData,
    allEmployee,
    getUserData,
    getStatusData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
