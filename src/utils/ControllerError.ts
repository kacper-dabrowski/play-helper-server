interface ControllerError extends Error {
  status: number;
  details?: string;
}
export default ControllerError;
