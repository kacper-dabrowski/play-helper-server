export class ExtendableError extends Error {
    message: string;

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.stack = new Error(message).stack;
    }
}

function genericErrorFactory(defaultMessage: string, statusCode: number) {
    return class extends ExtendableError {
        status: number;

        constructor(message: string) {
            super(message || defaultMessage);
            this.status = statusCode;
        }
    };
}

type ErrorType = [string, number, string];

interface BuiltDefinitions {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}
const builtDefinitions: BuiltDefinitions = {};

const errorTypes: Array<ErrorType> = [
    ['NotAuthorizedError', 401, 'Not Authorized'],
    ['BadRequestError', 400, 'Bad Request'],
    ['NoGrantsError', 403, 'No Grants'],
    ['NotFoundError', 404, 'Not Found'],
    ['ExistentError', 409, 'Already Exists'],
    ['UserBannedError', 403, 'User Banned'],
    ['UserSuspendedError', 403, 'User Suspended'],
    ['InvalidContentTypeError', 415, 'Invalid Content Type'],
    ['InvalidOriginError', 403, 'Invalid Origin'],
    ['TooManyRequestsError', 429, 'Too Many Requests'],
    ['DeviceIDIsTakenError', 409, 'Device ID is taken'],
    ['ForbiddenAction', 403, 'Forbidden Action'],
    ['ActionInfo', 400, 'Action Info'],
    ['SessionBackendUnavailable', 503, 'Authorization services are currently unavailable'],
];
errorTypes.forEach(([typeName, code, name]) => {
    builtDefinitions[typeName] = genericErrorFactory(name, code);
});

export interface GenericError {
    message: string;
    stack: string | undefined;
    status: number;
}

export const isErrorWithMessage = (error: unknown): error is Error => {
    return error instanceof Error;
};

export default builtDefinitions;
