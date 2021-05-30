import { ErrorRequestHandler } from 'express';
import { GenericError, ExtendableError } from '.';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error: GenericError, req, res, next) => {
    if (error instanceof ExtendableError)
        return res.status(error.status).send({ message: error.message, errorCode: error.status });
    return res.status(503).send({ message: 'An unknown error occurred', errorCode: 500 });
};

export default errorHandler;
