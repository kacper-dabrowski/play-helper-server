import bcrypt from 'bcryptjs';
import config from '../../config';
import User from '../../models/User';
import Errors from '../errors';
import { LoginUserDto, OperationFeedback, AuthResult, CreateUserDto } from './dto';
import { JwtVerificator, Verificator } from './verification';

export class AuthModule {
    constructor(private verificator: Verificator) {}

    async loginUser({ username, password }: LoginUserDto): Promise<OperationFeedback<AuthResult>> {
        const existingUser = await User.findOne({ username: { $eq: username } });

        if (!existingUser) {
            throw new Errors.BadRequestError('credentialsInvalid');
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            throw new Errors.BadRequestError('credentialsInvalid');
        }

        return this.signUser(existingUser.id, existingUser.fullName);
    }

    async registerUser(createUserDto: CreateUserDto): Promise<OperationFeedback<AuthResult>> {
        const { username, fullName, password, repeatPassword } = createUserDto;

        const isExistingUser = await User.findOne({ username: { $eq: username } });

        if (isExistingUser) {
            throw new Errors.ExistentError();
        }

        if (password !== repeatPassword) {
            throw new Errors.BadRequestError();
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const createdUser = new User({ username, password: hashedPassword, fullName });

        await createdUser.save();

        return this.signUser(createdUser._id, fullName);
    }

    private signUser(id: string, fullName: string): OperationFeedback<AuthResult> {
        const { expiresIn, token } = this.verificator.sign({ userId: id, fullName });

        return {
            success: true,
            data: {
                token,
                fullName: fullName,
                expiresIn,
                userId: id,
            },
        };
    }

    getUserIdFromToken(token?: string): string | undefined {
        if (!token) {
            return undefined;
        }

        const decodedData = this.verificator.verify(token);

        if (!decodedData) {
            return undefined;
        }

        return decodedData?.userId;
    }
}

export const auth = new AuthModule(new JwtVerificator(config.EXPIRES_IN, process.env.JWT_KEY));
