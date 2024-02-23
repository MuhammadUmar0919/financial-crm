import { toast } from 'react-hot-toast';
import codeMessage from './codeMessage';

const errorHandler = (error) => {
  const { response } = error;
  console.log(error)
  if (response.data && response.data.jwtExpired) {
    const result = window.localStorage.getItem('auth');
    const jsonFile = window.localStorage.getItem('isLogout');
    const { isLogout } = (jsonFile && JSON.parse(jsonFile)) || false;
    window.localStorage.removeItem('auth');
    window.localStorage.removeItem('isLogout');
    if (result || isLogout) {
      window.location.href = '/logout';
    }
  }

  if (response && response.status) {
    const message = response.data && response.data.message;

    const errorText = message || codeMessage[response.status];
    const { status } = response;

    toast.error(`Request error ${status}`, { duration: 4000 });
    return response.data;
  } else {
    if (navigator.onLine) {
      // Code to execute when there is internet connection
      toast.error('Problem connecting to server', {
        description: 'Cannot connect to the server, Try again later',
        duration: 5000,
      });
      return {
        success: false,
        result: null,
        message: 'Cannot connect to the server, Check your internet network',
      };
    } else {
      // Code to execute when there is no internet connection
      toast.error('No internet connection', {
        description: 'Cannot connect to the Internet, Check your internet network',
        duration: 5000,
      });
      return {
        success: false,
        result: null,
        message: 'Cannot connect to the server, Check your internet network',
      };
    }
  }
};

export default errorHandler;
