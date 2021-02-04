import { MiddlewareFn } from "../middleware/Middleware";
import Solution, { SolutionData } from "../models/Solution";
import errorTypes from "../utils/errors/errorTypes";
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
  const { title, description, man, woman, company, isPublic } = req.body;
  const { solutionId } = req.params;
  if (!solutionId) {
    throw new Error(errorTypes.BAD_REQUEST);
  }
  const solution = await Solution.findById(solutionId);
};

export const deleteSolutionById: MiddlewareFn = (req, res, next) => {};

export const getSolutions: MiddlewareFn = (req, res, next) => {};
