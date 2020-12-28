import ControllerError from "./ControllerError";

const createError = (message: string, status: number, details?: "") => {
  const error = new Error(message) as ControllerError;
  error.status = status;
  if (details) {
    error.details = details;
  }

  return error;
};

export default createError;
