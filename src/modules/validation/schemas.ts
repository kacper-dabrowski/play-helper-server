import Joi from 'joi';

const requiredString = () => Joi.string().required();
const optionalBoolean = () => Joi.boolean().optional();

export const solutionValidationSchema = Joi.object({
    title: requiredString(),
    description: requiredString(),
    content: requiredString(),
    isPublic: optionalBoolean(),
});

export const supportRequestSchema = Joi.object({
    title: requiredString(),
    description: requiredString(),
    department: requiredString(),
    content: requiredString(),
    isPublic: optionalBoolean(),
});

export const registrationValidationSchema = Joi.object({
    username: requiredString(),
    password: requiredString().min(6).max(64),
    repeatPassword: Joi.ref('password'),
    fullName: requiredString(),
    isAdmin: optionalBoolean(),
});

export const settingsUpdateSchema = Joi.object({ settings: Joi.object({ startingPage: Joi.string().optional() }) });

export const loginSchema = Joi.object({
    username: requiredString(),
    password: requiredString(),
});
