export interface CreateUserDto {
    username: string;
    fullName: string;
    password: string;
    repeatPassword: string;
}

export interface OperationFeedback<T = undefined> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface LoginUserDto {
    username: string;
    password: string;
}
export interface AuthResult {
    userId: string;
    expiresIn: number;
    token: string;
    fullName: string;
}
