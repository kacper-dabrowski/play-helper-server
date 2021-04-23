import SupportRequest, { allowedUpdates } from '../models/SupportRequest';
import { MiddlewareFn } from '../middleware/Middleware';
import updateEntry from '../utils/updateEntry';
import { routeWrapper } from '../middleware/routeWrapper';
import Errors from '../utils/errors';

export const getAllSupportRequests: MiddlewareFn = routeWrapper(async (req, res) => {
    const supportRequests = await SupportRequest.find({});
    return res.status(200).send({ supportRequests });
});

export const putAddSupportRequest: MiddlewareFn = routeWrapper(async (req, res) => {
    const { title, department, description, content } = req.body;
    const supportRequest = new SupportRequest({
        title,
        department,
        description,
        content,
    });

    await supportRequest.save();

    return res.status(200).send({ message: 'Entity created' });
});

export const updateSupportRequestById: MiddlewareFn = routeWrapper(async (req, res) => {
    const { srqId } = req.params;
    const { title, department, description, content } = req.body;

    const supportRequest = await SupportRequest.findById(srqId);

    if (!supportRequest) {
        throw new Errors.NotFoundError();
    }
    const updates = { title, department, description, content };
    const updatedObject = updateEntry(supportRequest, updates, allowedUpdates);

    await supportRequest.updateOne(updatedObject);
    await supportRequest.save();

    return res.status(200).send({ message: 'Entity updated successfully' });
});

export const deleteSupportRequestById: MiddlewareFn = routeWrapper(async (req, res) => {
    const { srqId } = req.params;

    await SupportRequest.findByIdAndDelete(srqId);

    return res.status(200).send({ message: 'Entity removed successfully' });
});
