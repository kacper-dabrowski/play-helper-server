import { Verificator, UserDataToSign } from './verificator';

export class FakeVerificator implements Verificator {
    constructor(verificatorConfig?: Verificator) {
        Object.assign(this, { ...verificatorConfig });
    }

    sign(userData: UserDataToSign): { expiresIn: number; token: string } {
        return {
            expiresIn: 123,
            token: `${userData.userId}token`,
        };
    }

    verify(token: string): UserDataToSign {
        return { userId: 'some-userId', fullName: `test-test-from${token}` };
    }
}
