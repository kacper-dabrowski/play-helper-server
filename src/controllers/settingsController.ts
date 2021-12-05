import { MiddlewareFn } from '../middleware/Middleware';
import { routeWrapper } from '../middleware/routeWrapper';
import User, { allowedSettingsUpdates, UserSettings } from '../models/User';
import Errors from '../modules/errors';
import updateEntry from '../modules/updateEntry';

export const postEditSettings: MiddlewareFn = routeWrapper(async (req, res) => {
    const { userId } = req;
    const settings: UserSettings = req.body.settings;

    if (!settings) {
        throw new Errors.BadRequestError('Settings object was not provided');
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new Errors.BadRequestError('User was not found');
    }

    const modifiedUserSettings = updateEntry(user.settings, settings, allowedSettingsUpdates);

    user.settings = modifiedUserSettings;

    await user.save();

    return res.status(200).send({ message: 'Users settings updated successfully' });
});

export const getUser: MiddlewareFn = routeWrapper(async (req, res) => {
    const { userId } = req;

    const user = await User.findById(userId);

    if (!user) {
        throw new Errors.NotFoundError();
    }

    const { username, fullName, settings, isAdmin } = user;
    return res.status(200).send({ userId, username, fullName, settings, isAdmin });
});
