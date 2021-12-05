import Joi from 'joi';
import { MiddlewareFn } from '../../middleware/Middleware';

export const validateBodyWithSchema = (schema: Joi.Schema): MiddlewareFn => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            next(error);
        }
    };
};
