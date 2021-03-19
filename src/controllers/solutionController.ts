import { MiddlewareFn } from '../middleware/Middleware';
import { routeWrapper } from '../middleware/routeWrapper';
import Solution, { allowedUpdates, SolutionData } from '../models/Solution';
import updateEntry from '../utils/updateEntry';
import Errors from '../utils/errors';

export const putAddSolution: MiddlewareFn = routeWrapper(async (req, res) => {
    const { title, description, content, isPublic } = req.body;

    const newSolution = new Solution({
        title,
        description,
        content,
        isPublic,
        author: req.userId,
    });

    await newSolution.save();

    return res.status(201).send({ message: 'Successfully created a new solution' });
});

export const postUpdateSolution: MiddlewareFn = routeWrapper(async (req, res) => {
    const { title, description, content, isPublic } = req.body;
    const { solutionId } = req.params;

    if (!solutionId) {
        throw new Errors.BadRequestError();
    }
    const solutionUpdate = {
        title,
        description,
        content,
        isPublic,
    };

    const solution = (await Solution.findById(solutionId)) as SolutionData;
    const updatedSolution = updateEntry(solution, solutionUpdate, allowedUpdates);
    await updatedSolution.update(updatedSolution);

    return res.status(200).send({ message: 'Entity updated successfully' });
});

export const deleteSolutionById: MiddlewareFn = routeWrapper(async (req, res) => {
    const { solutionId } = req.params;
    if (!solutionId) {
        throw new Errors.BadRequestError();
    }
    const solutionToDelete = await Solution.findById(solutionId);

    if (!solutionToDelete || solutionToDelete.author.toString() !== req.userId) {
        throw new Errors.NoGrantsError();
    }
    await solutionToDelete.delete();
    return res.status(200).send({ message: 'Entity removed successfully' });
});

export const getSolutions: MiddlewareFn = routeWrapper(async (req, res) => {
    const solutions = await Solution.find({
        $or: [{ author: { $eq: req.userId } }, { isPublic: { $eq: true } }],
    });
    const solutionsToSend = solutions.map((solution) => {
        const isAuthor = solution.author.toString() === req.userId;

        return { ...solution.toObject(), isAuthor };
    });

    return res.status(200).send(solutionsToSend);
});

export const getSolutionById: MiddlewareFn = routeWrapper(async (req, res) => {
    const { solutionId } = req.params;
    if (!solutionId) throw new Errors.BadRequestError();

    const solution = await Solution.findById(solutionId);
    if (!solutionId) throw new Errors.NotFoundError();

    return res.send(solution);
});
