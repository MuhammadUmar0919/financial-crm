// ** React Imports
import { useEffect } from 'react'

// ** Hooks Import
import { useAuth } from 'Hooks/useAuth'
import useToken from 'Hooks/UseToken'
import BlankLayout from '@core/layouts/BlankLayout'
import NoNetConnect from 'Pages/ErrorPages/NoNetwork'

const GuestGuard = props => {
  const { children, fallback } = props
  const token = useToken()
  // const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      window.location.pathname = '/login'
    }
    if (token) {
      window.location.pathname = '/'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])
  // if (auth.loading || (!auth.loading && auth.user !== null)) {
  //   return fallback
  // }

  return children

}

export default GuestGuard
