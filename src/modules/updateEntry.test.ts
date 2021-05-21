import updateEntry from './updateEntry';

describe('updateEntry', () => {
    it('should update an entry only within a valid array of updates', () => {
        const objectToUpdate = {
            some: 'key',
            to: 'to',
            update: 'update',
        };

        const result = updateEntry(objectToUpdate, { update: 'updated', to: 'should not be updated' }, ['update']);

        expect(result).toEqual({ some: 'key', to: 'to', update: 'updated' });
    });

    it('should update an entry within a valid array of updates', () => {
        const objectToUpdate = {
            some: 'key',
            to: 'to updated',
            update: 'update',
        };

        const result = updateEntry(objectToUpdate, { update: 'updated', to: 'to updated' }, ['update', 'to']);

        expect(result).toEqual({ some: 'key', to: 'to updated', update: 'updated' });
    });

    it('should return unchanged object if no updates provided', () => {
        const objectToUpdate = {
            some: 'key',
            to: 'to',
            update: 'update',
        };

        const result = updateEntry(objectToUpdate, {}, ['update', 'to']);

        expect(result).toEqual({ some: 'key', to: 'to', update: 'update' });
    });
});
