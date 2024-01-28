// react hot toast import
import toast from "react-hot-toast";
/**
 * Shows a toast message based on the provided parameters.
 * @param {string} name - Title or name used in the message.
 * @param {boolean} isSuccess - Indicates whether the operation was successful.
 * @param {boolean} isEdit - Indicates if it's an edit operation (default: false).
 * @param {boolean} isDelete - Indicates if it's a delete operation (default: false).
 */
export const ToastPromise = async (name, operation, isSuccess) => {
  let loadingMessage, successMessage, errorMessage;

  // Determine appropriate messages based on operation type
  if (operation === "onEdit") {
    loadingMessage = "Updating...";
    if(isSuccess) {
      successMessage = `${name} updated successfully!`;
    } else {
      errorMessage = "There was an error sending during updating";
    }
  } else if (operation === "onDelete") {
    loadingMessage = "Removing...";
    if(isSuccess) {
      successMessage = `${name} removed successfully!`;
    } else {
      errorMessage = "There was an error sending during removing";
    }
  } else if (operation === "onCreate") {
    loadingMessage = "Creating...";
    if(isSuccess) {
      successMessage = `${name} successfully created!`;
    } else {
      errorMessage = "There was an error sending during creating";
    }
  } else {
    loadingMessage = `Generating ${name}...`;
    if(isSuccess) {
      successMessage = `Downloaded ${name}`;
    } else {
      errorMessage = `Error generating ${name}`;
    }
  }

  // Use toast.promise to handle asynchronous actions and display appropriate messages
  await toast.promise(
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    }), {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage,
    }
  );
};