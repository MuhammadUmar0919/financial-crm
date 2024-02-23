import { toast } from 'react-hot-toast';
import codeMessage from './codeMessage';

const successHandler = (response, options = { notifyOnSuccess: false, notifyOnFailed: true }) => {
  const { data } = response;
  console.log(response)
  if (data && data.success === true) {
    const message = response.data && data.message;
    const successText = message || codeMessage[response.status];

    if (options.notifyOnSuccess) {
      toast.success(`Request success: ${successText}`, { duration: 2000 });
    }
  } else {
    const message = response.data && data.message;
    const errorText = message || codeMessage[response.status];
    const { status } = response;
    if (options.notifyOnFailed) {
      toast.error(`Request error ${status}: ${errorText}`, { duration: 4000 });
    }
  }
};

export default successHandler;
