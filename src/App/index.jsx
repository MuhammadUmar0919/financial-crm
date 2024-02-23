import React, { useEffect, useState } from 'react';
import { AxiosInterceptor } from '@/Api/Config';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Toaster } from 'react-hot-toast';
import ThemeComponent from '@/@core/theme/ThemeComponent';
import WindowWrapper from '@/@core/components/window-wrapper';
import { AuthProvider } from '@/Context/AuthContext';
import ReactHotToast from '@/@core/styles/libs/react-hot-toast';
import { SettingsProvider } from '@/@core/context/settingsContext';
import RouterPage from '@/Routes';
import NetworkRouter from '@/Routes/NetworkRouter';
import { useOnlineStatus } from '@/Hooks/useOnlineStatus';
import LoadingBar from 'react-top-loading-bar';
import { useTheme } from '@mui/material/styles';
import { DataProvider } from '@/Context/DataContext';
import { Provider } from 'react-redux';
import store from '@/Redux/store';

const App = () => {
  const theme = useTheme();
  const { isOnline: isNetwork, setIsOnline } = useOnlineStatus();

  // State for controlling the progress bar
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsOnline(navigator.onLine);
  }, [isNetwork]);

  return (
    <Provider store={store}>
      <DataProvider>
        <AuthProvider>
          <SettingsProvider>
            <ThemeComponent>
              <WindowWrapper>
                <AxiosInterceptor>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* LoadingBar component for the progress bar */}
                    <LoadingBar
                      color="#ffffff"
                      progress={progress}
                      onLoaderFinished={() => setProgress(0)}
                    />

                    {/* Your main content */}
                    {!isNetwork ? <RouterPage /> : <NetworkRouter />}
                  </LocalizationProvider>
                </AxiosInterceptor>
              </WindowWrapper>

              {/* ReactHotToast for displaying toasts */}
              <ReactHotToast>
                <Toaster position="top-right" toastOptions={{ className: 'react-hot-toast' }} />
              </ReactHotToast>
            </ThemeComponent>
          </SettingsProvider>
        </AuthProvider>
      </DataProvider>
    </Provider>
  );
};

export default App;
