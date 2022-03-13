import { MiddlewareFn } from '../middleware/Middleware';
import { routeWrapper } from '../middleware/routeWrapper';
import Errors from '../modules/errors';
import { settingsModule } from '../modules/user/settings';

export const postEditSettings: MiddlewareFn = routeWrapper(async (req, res) => {
    const { userId } = req;

    if (!userId) {
        throw new Errors.NotFoundError();
    }

    const { settings } = req.body;

    const { data, success } = await settingsModule.updateUserSettings(userId, settings);

    return res.status(200).send({ success, ...data });
});

export const getUser: MiddlewareFn = routeWrapper(async (req, res) => {
    const { userId } = req;

    if (!userId) {
        throw new Errors.NotFoundError();
    }

    const { success, data } = await settingsModule.getUserSettings(userId);

    return res.status(200).send({ success, ...data });
});
