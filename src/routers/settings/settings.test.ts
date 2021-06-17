import User from '../../models/User';
import { createUser, loginDummyUser, settingsTestHelpers } from '../../testHelpers/testHelpers';

describe('user settings', () => {
    const defaultUserSettings = {
        startingPage: 'basic',
    };
    let token: string;
    let userId: string;

    beforeAll(async () => {
        await User.deleteMany();
        await createUser(1);
    });

    beforeEach(async () => {
        const userLogin = await loginDummyUser(1);
        token = userLogin.token;
        userId = userLogin.userId;
    });

    it('should set users settings to default when creating a new one', async () => {
        const user = await User.findById(userId);

        expect(user?.settings).toMatchObject(defaultUserSettings);
    });

    it('should set users settings after a valid request', async () => {
        const response = await settingsTestHelpers.editSettingsAsLoggedUser(token, {
            settings: { startingPage: '/double-opened' },
        });
        const user = await User.findById(userId);

        expect(response.body).toEqual({ message: 'Users settings updated successfully' });
        expect(user?.settings).toMatchObject({ ...defaultUserSettings, startingPage: '/double-opened' });
    });

    it('should throw an error if settings are not sent correctly', async () => {
        const response = await settingsTestHelpers.editSettingsAsLoggedUser(token, {});

        expect(response.body).toEqual({ errorCode: 400, message: 'Settings object was not provided' });
    });

    it('should throw an error if user with specified ID is not found', async () => {
        const { userId, token } = await loginDummyUser(1);

        await User.findOneAndDelete({ _id: userId });

        const response = await settingsTestHelpers.editSettingsAsLoggedUser(token, {
            settings: { startingPage: '/double-opened' },
        });

        expect(response.body).toEqual({ errorCode: 400, message: 'User was not found' });
    });
});
