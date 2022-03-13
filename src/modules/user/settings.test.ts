import { SettingsModule } from './settings';
import Errors from '../errors';
import User from '../../models/User';
import updateEntry from '../updateEntry';

jest.mock('../../models/User');
jest.mock('../updateEntry');

describe('modules - user - settings', () => {
    const settingsModule = new SettingsModule();
    const updateMock = jest.fn();

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getting user settings', () => {
        it('should throw, if user with given user id is not found', async () => {
            givenUserDoesNotExist();

            try {
                await settingsModule.getUserSettings('does-not-exists');
            } catch (error) {
                if (error instanceof Error) {
                    expect(error).toEqual(new Errors.NotFoundError());
                }
            }
        });

        it('should return user data if user exists', async () => {
            givenUserExists();
            givenUpdateReturnsUser();

            const result = await settingsModule.getUserSettings('exists');

            expect(result).toEqual({ data: { fullName: 'Test Test', settings: {}, userId: 'exists' }, success: true });
        });
    });

    describe('updating user settings', () => {
        it('should throw, if settings object is not provided', async () => {
            try {
                await settingsModule.updateUserSettings('some-id');
            } catch (error) {
                if (error instanceof Error) {
                    expect(error).toEqual(new Errors.BadRequestError('Settings object was not provided'));
                }
            }
        });

        it('should throw, if user does not exist', async () => {
            givenUserDoesNotExist();

            try {
                await settingsModule.updateUserSettings('some-id', { startingPage: 'some-starting-page' });
            } catch (error) {
                if (error instanceof Error) {
                    expect(error).toEqual(new Errors.BadRequestError('User was not found'));
                }
            }
        });

        it('should issue a requested update on user settings', async () => {
            givenUserExists();
            givenUpdateReturnsUser();

            const result = await settingsModule.updateUserSettings('user-id', { startingPage: 'some-starting-page' });

            expect(result).toEqual({
                data: { fullName: 'Test Test', settings: { startingPage: 'some-starting-page' }, userId: 'user-id' },
                success: true,
            });
            expect(updateMock).toHaveBeenCalledWith({ $set: { settings: { startingPage: 'some-starting-page' } } });
        });
    });

    function givenUserDoesNotExist() {
        jest.spyOn(User, 'findById').mockResolvedValue(null);
    }

    function givenUserExists() {
        jest.spyOn(User, 'findById').mockResolvedValue({
            id: 'user-id',
            fullName: 'Test Test',
            settings: {},
            update: updateMock,
        });
    }

    function givenUpdateReturnsUser() {
        (updateEntry as jest.Mock).mockReturnValue({ startingPage: 'some-starting-page' });
        updateMock.mockResolvedValue({
            id: 'user-id',
            fullName: 'Test Test',
            settings: { startingPage: 'some-starting-page' },
        });
    }
});
