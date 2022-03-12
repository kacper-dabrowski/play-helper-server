import { MiddlewareFn } from '../middleware/Middleware';
import { routeWrapper } from '../middleware/routeWrapper';
import { auth } from '../modules/auth/auth';

export const postAddUser: MiddlewareFn = routeWrapper(async (req, res) => {
    const { success, data } = await auth.registerUser(req.body);

    return res.status(201).json({ success, ...data });
});

export const loginUser: MiddlewareFn = routeWrapper(async (req, res) => {
    const { success, data } = await auth.loginUser(req.body);

    return res.status(200).json({ success, ...data });
});
