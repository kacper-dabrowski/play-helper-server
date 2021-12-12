import Joi from 'joi';
import { MiddlewareFn } from '../../middleware/Middleware';
import Errors, { isErrorWithMessage } from '../errors';

export const validateBodyWithSchema = (schema: Joi.Schema): MiddlewareFn => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            const hasMessage = isErrorWithMessage(error);
            next(new Errors.BadRequestError(hasMessage ? error.message : 'Request is malformed'));
        }
    };
};
