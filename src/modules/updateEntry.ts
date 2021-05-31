type objectEntry<T> = [string & keyof T, T[string & keyof T]];

const updateEntry = <T>(object: T, updates: Partial<T>, updatableFields: Array<string>): T => {
    const updateKeys = Object.keys(updates);

    if (updateKeys.length === 0) {
        return object;
    }

    Object.entries(updates).forEach((entry) => {
        const [key, value] = entry as objectEntry<T>;
        if (updatableFields.includes(key) && value !== null && value !== undefined) {
            object[key] = value;
        }
    });
    return object;
};

export default updateEntry;
