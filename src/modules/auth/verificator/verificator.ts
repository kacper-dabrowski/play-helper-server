export interface Verificator {
    sign(userData: UserDataToSign): { expiresIn: number; token: string };
    verify(token: string): UserDataToSign | undefined;
}

export interface UserDataToSign {
    fullName: string;
    userId: string;
}
