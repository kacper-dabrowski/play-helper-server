import { MiddlewareFn } from '../middleware/Middleware';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import config from '../config';
import signUser from '../utils/auth/signUser';
import Errors from '../utils/errors';
import { routeWrapper } from '../middleware/routeWrapper';

export const postAddUser: MiddlewareFn = routeWrapper(async (req, res) => {
    const { username, fullName, password } = req.body;

    if (!username || !fullName || !password) {
        throw new Errors.BadRequestError();
    }

    const isExistingUser = await User.findOne({ username });

    if (isExistingUser) {
        throw new Errors.ExistentError();
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword, fullName });
    const savedUser = await user.save();
    const token = signUser(savedUser);

    return res.status(201).send({
        message: 'User created successfully',
        token,
        userId: savedUser._id,
        expiresIn: config.EXPIRES_IN,
    });
});

export const loginUser: MiddlewareFn = routeWrapper(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        throw new Errors.ExistentError();
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new Errors.BadRequestError('Credentials were incorrect.');
    }

    const token = signUser(user);

    return res.status(200).send({
        token,
        userId: user._id,
        fullName: user.fullName,
        expiresIn: config.EXPIRES_IN,
    });
});
