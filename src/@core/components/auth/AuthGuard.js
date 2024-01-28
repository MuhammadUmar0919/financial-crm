// ** React Imports
import React, {
  useEffect
} from 'react'
import {
  Navigate,
  useLocation,
  useRoutes
} from 'react-router-dom';

// ** Hooks Import
import {
  useAuth
} from 'Hooks/useAuth';
import {
  useDispatch
} from 'react-redux';
import useToken from 'Hooks/UseToken';
// ** Routes
import RoutesPage from "Routes";
import LoginRoutes from 'Routes/NetworkRouter';

const AuthGuard = props => {
  const {
    children,
    fallback
  } = props
  // ** Hooks
  const auth = useAuth()
  const navigate = useDispatch()
  const {
    token
  } = useToken()
  const router = useLocation()
  // React.useEffect(() => {
    if (!token) {
      navigate('/login')
    } 
    if(token) {
      navigate('/')
    }
  // }, [token])
  return useRoutes([LoginRoutes]);
}

export default AuthGuard