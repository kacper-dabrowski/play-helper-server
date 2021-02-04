type objectEntry<T> = [string & keyof T, T[string & keyof T]];

const updateEntry = <T>(
  object: T,
  updates: Partial<T>,
  updatableFields: Array<string>
) => {
  Object.entries(updates).forEach((entry) => {
    const [key, value] = entry as objectEntry<T>;
    if (updatableFields.includes(key)) {
      object[key] = value;
    }
  });
  return object;
};
