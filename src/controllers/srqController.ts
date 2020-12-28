import SupportRequest from "../models/SupportRequest";
import { MiddlewareFn } from "../middleware/Middleware";
import createError from "../utils/createError";

interface SupportRequestObject {
  title?: string;
  description?: string;
  department?: string;
}

export const getAllSupportRequests: MiddlewareFn = async (req, res, next) => {
  try {
    const supportRequests = await SupportRequest.find({});
    return res.status(200).send({ supportRequests });
  } catch (error) {
    const customError = createError(error.message, 500);
    next(customError);
  }
};

export const postAddSupportRequest: MiddlewareFn = async (req, res, next) => {
  try {
    const { title, department, description } = req.body;
    const supportRequest = new SupportRequest({
      title,
      department,
      description,
    });

    await supportRequest.save();

    return res.status(200).send({ message: "Entity created" });
  } catch (error) {
    const customError = createError(
      "There was something wrong with your request.",
      400
    );

    next(customError);
  }
};

export const updateSupportRequestById: MiddlewareFn = async (
  req,
  res,
  next
) => {
  try {
    const { srqId } = req.params;
    const { title, department, description } = req.body;

    const supportRequest = await SupportRequest.findById(srqId);
    if (!supportRequest) {
      const customError = createError("Could not find requested entity", 404);
      throw customError;
    }
    const updates: SupportRequestObject = {};
    if (title) {
      updates.title = title;
    }
    if (department) {
      updates.department = department;
    }
    if (description) {
      updates.description = description;
    }
    await supportRequest.updateOne(updates);
    await supportRequest.save();
    return res.status(200).send({ message: "Entity updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteSupportRequestById: MiddlewareFn = async (
  req,
  res,
  next
) => {
  try {
    const { srqId } = req.params;

    await SupportRequest.findByIdAndDelete(srqId);

    return res.status(200).send({ message: "Entity removed successfully" });
  } catch (error) {
    next(createError("Could not delete the entity.", 400));
  }
};
