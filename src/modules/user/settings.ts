import User, { allowedSettingsUpdates, UserSettings } from '../../models/User';
import { OperationFeedback } from '../auth/dto';
import { UserWithSettings } from './dto';
import Errors from '../errors';
import updateEntry from '../updateEntry';

export class SettingsModule {
    async getUserSettings(userId: string): Promise<OperationFeedback<UserWithSettings>> {
        const user = await User.findById(userId);

        if (!user) {
            throw new Errors.NotFoundError();
        }

        const { fullName, settings } = user;

        return {
            success: true,
            data: {
                userId,
                fullName,
                settings,
            },
        };
    }

    async updateUserSettings(
        userId: string,
        settingsUpdate?: UserSettings
    ): Promise<OperationFeedback<UserWithSettings>> {
        if (!settingsUpdate) {
            throw new Errors.BadRequestError('Settings object was not provided');
        }

        const user = await User.findById(userId);

        if (!user) {
            throw new Errors.BadRequestError('User was not found');
        }

        const modifiedUserSettings = updateEntry(user.settings, settingsUpdate, allowedSettingsUpdates);

        const { id, fullName, settings } = await user.update({ $set: { settings: modifiedUserSettings } });

        return {
            success: true,
            data: {
                userId: id,
                fullName,
                settings,
            },
        };
    }
}

export const settingsModule = new SettingsModule();
