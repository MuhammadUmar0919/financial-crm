// ** React-redux
import { useDispatch, useSelector } from "react-redux"
// ** Axios
// import axios from 'axios'

// ** Config
import authConfig from "configs/auth"
// ** Utils
import { TimeSleep } from "Utils/timeSleep"
// ** Hooks
import useToken from "Hooks/UseToken"
import toast from "react-hot-toast"
import React from "react"

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
}
const AuthContext = React.createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { token, setToken } = useToken()
  // ** States
  const [user, setUser] = React.useState(defaultProvider.user)
  const { authData, loading } = useSelector((state) => state.authReducer)
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
  const handleLogin = async (params, errorCallback) => {
    dispatch({ type: "AUTH_START" })
    try {
      if (authData?.length) {
        await TimeSleep()
        for (let auth of authData) {
          if (
            params.email === auth.email &&
            params.password === auth.password
          ) {
            toast.success("Avtorizatsiya muvaffaqiyatli qabul qilindi")
            // await handleRequest()
            // dispatch({ type: "AUTH_SUCCESS" })
            
            setToken(auth, params.rememberMe)
            setUser(auth.roleName)
            window.location.href = "/"
          } else {
            toast.error("You are not registered!")
            dispatch({ type: "AUTH_FAIL" })
          }
        }
      }
    } catch (err) {
      toast.info("Not registered!")
      dispatch({ type: "AUTH_FAIL" })
      if (err.response?.status === 500) window.location.href = "/server-error"
    }
    dispatch({ type: "AUTH_SUCCESS" })
  }
 
  const handleLogOutToken = () => {
    if (sessionStorage.getItem("crm-admin"))
      sessionStorage.removeItem("crm-admin", token)
    if (localStorage.getItem("profile"))
      localStorage.removeItem("profile", token)
    if (localStorage.getItem("crm-admin")) {
      localStorage.removeItem("crm-admin", token)
    }
    dispatch({ type: "ACL_DELETE" })
  }

  const handleLogout = () => {
    setUser(null)
    handleLogOutToken()
    window.localStorage.removeItem("userData")
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    window.location.href = "/login"
  }

  const handleRegister = (params, errorCallback) => {
    // axios
    //   .post(authConfig.registerEndpoint, params)
    //   .then(res => {
    //     if (res.data.error) {
    //       if (errorCallback) errorCallback(res.data.error)
    //     } else {
    //       handleLogin({ email: params.email, password: params.password })
    //     }
    //   })
    //   .catch(err => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
