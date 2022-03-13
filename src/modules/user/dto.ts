import { UserSettings } from '../../models/User';

export interface UserWithSettings {
    userId: string;
    fullName: string;
    settings: UserSettings;
}
