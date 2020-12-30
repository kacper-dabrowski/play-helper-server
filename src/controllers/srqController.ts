import SupportRequest from "../models/SupportRequest";
import { MiddlewareFn } from "../middleware/Middleware";
import { Error } from "mongoose";
import errorTypes from "../utils/errors/errorTypes";

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
    next(error.message);
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
    next(error.message);
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
      throw new Error(errorTypes.RESOURCE_NOT_FOUND);
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
    next(error.message);
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
    next(error.message);
  }
};
