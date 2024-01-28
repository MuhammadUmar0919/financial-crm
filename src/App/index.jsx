// react import
import React from "react"
// api import
import { AxiosInterceptor } from "Api/Config"
// emotion import
import { CacheProvider } from "@emotion/react"
// @mui import
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// configs import
import "configs/i18n"
// react hot toast import
import { Toaster } from "react-hot-toast"
// theme import
import ThemeComponent from "@core/theme/ThemeComponent"
// components import
import WindowWrapper from "@core/components/window-wrapper"
// context import
import { AuthProvider } from "Context/AuthContext"
import ReactHotToast from "@core/styles/libs/react-hot-toast"
import { SettingsProvider } from "@core/context/settingsContext"
// utils import
import { createEmotionCache } from "@core/utils/create-emotion-cache"
// css importt
import "prismjs"
import "styles/globals.css"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/themes/prism-tomorrow.css"
import "@core/components/iconify-bundle/icons-bundle-react"
import "simplebar-react/dist/simplebar.min.css"
import "react-perfect-scrollbar/dist/css/styles.css"
// routes import
import RouterPage from "Routes"
import NetworkRouter from "Routes/NetworkRouter"
// redux import
import store from "Redux/ReduxStore"
// hooks import
import { Provider } from "react-redux"
import { useOnlineStatus } from "Hooks/useOnlineStatus"

const clientSideEmotionCache = createEmotionCache()

const App = (props) => {
  const { emotionCache = clientSideEmotionCache } = props
  const { isOnline: isNetwork, setIsOnline } = useOnlineStatus()

  React.useEffect(() => {
    setIsOnline(navigator.onLine)
  }, [isNetwork])

  return (
    // keyinchalik bu providerni o'zgartirish kerak ya'ni bundey holat loyihaga ta'sir qiladi,
    // shunchun yoki redux yokida bularni bitta qilib keyin o'raladi
    <Provider store={store}>
      {/* <CacheProvider value={emotionCache}> */}
        <AuthProvider>
          <SettingsProvider>
            <ThemeComponent>
              <WindowWrapper>
                <AxiosInterceptor>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {isNetwork ? <RouterPage /> : <NetworkRouter />}
                  </LocalizationProvider>
                </AxiosInterceptor>
              </WindowWrapper>
              <ReactHotToast>
                <Toaster
                  position="top-right"
                  toastOptions={{ className: "react-hot-toast" }}
                />
              </ReactHotToast>
            </ThemeComponent>
          </SettingsProvider>
        </AuthProvider>
      {/* </CacheProvider> */}
    </Provider>
  )
}

export default App
