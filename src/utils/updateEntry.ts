type objectEntry<T> = [string & keyof T, T[string & keyof T]];

const updateEntry = <T>(object: T, updates: Partial<T>, updatableFields: Array<string>): T => {
    Object.entries(updates).forEach((entry) => {
        const [key, value] = entry as objectEntry<T>;
        if (updatableFields.includes(key) && value) {
            object[key] = value;
        }
    });
    return object;
};

export default updateEntry;
