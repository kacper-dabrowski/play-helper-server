import { MiddlewareFn } from "../middleware/Middleware";
import Solution, { allowedUpdates, SolutionData } from "../models/Solution";
import errorTypes from "../utils/errors/errorTypes";
import updateEntry from "../utils/updateEntry";

export const putAddSolution: MiddlewareFn = async (req, res, next) => {
  try {
    const { title, description, man, woman, company, isPublic } = req.body;

    const newSolution = new Solution({
      title,
      description,
      man,
      woman,
      company,
      isPublic,
    });

    await newSolution.save();

    return res
      .status(201)
      .send({ message: "Successfully created a new solution" });
  } catch (error) {
    next(errorTypes.BAD_REQUEST);
  }
};

export const postUpdateSolution: MiddlewareFn = async (req, res, next) => {
  try {
    const { title, description, man, woman, company, isPublic } = req.body;
    const { solutionId } = req.params;
    console.warn(req.params);
    console.warn(req.body);

    if (!solutionId) {
      throw new Error(errorTypes.BAD_REQUEST);
    }
    const solutionUpdate = {
      title,
      description,
      man,
      woman,
      company,
      isPublic,
    };
    const solution = (await Solution.findById(solutionId)) as SolutionData;
    const updatedSolution = updateEntry(
      solution,
      solutionUpdate,
      allowedUpdates
    );
    await updatedSolution.update(updatedSolution);
    return res.status(200).send({ message: "Entity updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteSolutionById: MiddlewareFn = async (req, res, next) => {
  const { solutionId } = req.params;
  if (!solutionId) throw new Error(errorTypes.RESOURCE_NOT_FOUND);
  await Solution.findByIdAndDelete(solutionId);
  return res.status(200).send({ message: "Entity removed successfully" });
};

export const getSolutions: MiddlewareFn = async (req, res, next) => {
  try {
    const solutions = await Solution.find({});
    return res.status(200).send(solutions);
  } catch (error) {
    next(error);
  }
};

export const getSolutionById: MiddlewareFn = async (req, res, next) => {
  try {
    const { solutionId } = req.params;
    if (!solutionId) throw new Error(errorTypes.BAD_REQUEST);

    const solution = await Solution.findById(solutionId);
    if (!solutionId) throw new Error(errorTypes.RESOURCE_NOT_FOUND);

    return res.send(solution);
  } catch (error) {
    next(error);
  }
};