// ** React-redux
import { useDispatch } from 'react-redux';
// ** Config
import authConfig from '@/configs/auth';
// ** Utils
import { TimeSleep } from '@/Utils/timeSleep';
// ** Hooks
import React from 'react';
import toast from 'react-hot-toast';
import useToken from '@/Hooks/useToken';
import { useData } from '@/Hooks/useData';

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
};

const AuthContext = React.createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const { allEmployee } = useData();
  const { token, setToken } = useToken();
  // ** States
  const [user, setUser] = React.useState(defaultProvider.user);
  const [loading, setLoading] = React.useState(false);

  // const { authData, loading } = useSelector((state) => state.authReducer)
  // ** Hooks
  // React.useEffect(() => {
  //   const initAuth = async () => {
  //     const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  //     if (storedToken) {
  //       setLoading(true)
  //       await axios
  //         .get(authConfig.meEndpoint, {
  //           headers: {
  //             Authorization: storedToken
  //           }
  //         })
  //         .then(async response => {
  //           setLoading(false)
  //           setUser({ ...response.data.userData })
  //         })
  //         .catch(() => {
  //           localStorage.removeItem('userData')
  //           localStorage.removeItem('refreshToken')
  //           localStorage.removeItem('accessToken')
  //           setUser(null)
  //           setLoading(false)
  //           if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
  //             router.replace('/login')
  //           }
  //         })
  //     } else {
  //       setLoading(false)
  //     }
  //   }
  //   initAuth()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  const superAdmin = {
    roleName: 'super-admin',
    password: 'Ixtiyor0919$%',
    email: 'ixtiyor0919@gmail.com',
    fullName: 'Komiljonov Ixtiyor',
    id: '19943cbb-c5f7-0f2b-4101-ff8c893c4548',
    portId: '19943cbb-c5f7-0f2b-4101-ff8c893c4548',
  }
  const allEmployeeData = [...allEmployee, superAdmin]
  const handleLogin = async (params, errorCallback) => {
    setLoading(true)
    try {
      if(allEmployeeData.length > 0) {
        for (let employee of allEmployeeData) {
          if (params.email === employee.email && params.password === employee.password) {
            toast.success('Avtorizatsiya muvaffaqiyatli qabul qilindi');
            setToken(employee, params.rememberMe);
            setUser(employee.roleName);
            await TimeSleep();
            window.location.href = '/';
          } else {
            toast.error('You are not registered!');
          }
        }
      } else {
        toast.error('You are not registered!');
      }
    } catch (err) {
      toast.error(err);
      if (err.response?.status === 500) window.location.href = '/server-error';
    } finally {
      setLoading(false)
    }
  };

  const handleLogOutToken = () => {
    if (sessionStorage.getItem('crm-admin')) sessionStorage.removeItem('crm-admin', token);
    if (localStorage.getItem('profile')) localStorage.removeItem('profile', token);
    if (localStorage.getItem('crm-admin')) {
      localStorage.removeItem('crm-admin', token);
    }
    dispatch({ type: 'ACL_DELETE' });
  };

  const handleLogout = () => {
    setUser(null);
    handleLogOutToken();
    window.localStorage.removeItem('userData');
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    window.location.href = '/login';
  };

  const values = {
    user,
    loading,
    setUser,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
