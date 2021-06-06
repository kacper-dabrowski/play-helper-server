import SupportRequest from '../../models/SupportRequest';
import User from '../../models/User';
import { createUser, loginDummyUser, srqTestHelpers } from '../../testHelpers/testHelpers';

describe('SRQ routes', () => {
    beforeAll(async () => {
        await SupportRequest.deleteMany();
        await User.deleteMany();
        await createUser(1);
        await createUser(2);
    });

    it('should add a new srq', async () => {
        const userToken = await loginDummyUser(1);
        const response = await srqTestHelpers.addSrqAsLoggedUser(userToken);

        expect(response.body).toEqual({ message: 'Entity created' });
    });

    it('should be able to get all created SRQs', async () => {
        const userToken = await loginDummyUser(1);

        await srqTestHelpers.addSrqAsLoggedUser(userToken);

        const response = await srqTestHelpers.getSrqsAsUser(userToken);

        expect(response.body.supportRequests).toHaveLength(2);
    });

    it('should be able to edit a selected srq', async () => {
        const userToken = await loginDummyUser(1);

        const srqs = await srqTestHelpers.getSrqsAsUser(userToken);

        const srqId = srqs.body.supportRequests[0]._id;

        await srqTestHelpers.editSrqAsLoggedInUser(
            userToken,
            {
                title: 'Updated title',
                description: 'Updated description',
                content: 'Updated content',
                department: 'Updated department',
            },
            srqId
        );
        const srqsAfterUpdate = await srqTestHelpers.getSrqsAsUser(userToken);

        const editedSrq = srqsAfterUpdate.body.supportRequests.find((srq) => srq._id === srqId);

        expect(editedSrq).toMatchObject({
            title: 'Updated title',
            description: 'Updated description',
            content: 'Updated content',
            department: 'Updated department',
        });
    });
    it('should be able to remove SRQ with specified ID', async () => {
        const userToken = await loginDummyUser(1);
        const allSrqs = await SupportRequest.find();

        const srqId = allSrqs[0]._id;

        const response = await srqTestHelpers.deleteSrqAsLoggedUser(userToken, srqId);

        const result = await SupportRequest.findById(srqId);

        expect(response.body.message).toEqual('Entity removed successfully');
        expect(result).toEqual(null);
    });
});
