import SupportRequest from "../models/SupportRequest";
import { MiddlewareFn } from "./Middleware";

export const getAllSupportRequests: MiddlewareFn = async (req, res, next) => {
  const supportRequests = await SupportRequest.find({});
  return res.status(200).send({ supportRequests });
};

export const postAddSupportRequest: MiddlewareFn = async (req, res, next) => {
  const { title, department, description } = req.body;

  const supportRequest = new SupportRequest({ title, department, description });
  try {
    await supportRequest.save();
    return res.status(200).send({ message: "Entity created" });
  } catch (error) {
    return res.status(400).send({ message: "Could not save the entity" });
  }
};

export const updateSupportRequestById: MiddlewareFn = async (
  req,
  res,
  next
) => {
  const { srqId } = req.params;
  const { title, department, description } = req.body;

  try {
    const supportRequest = await SupportRequest.findById(srqId);
    if (!supportRequest) {
      return res
        .status(404)
        .send({ message: "Could not find requested entity" });
    }
    if (title) {
      supportRequest.set(title);
    }
    if (department) {
      supportRequest.set(department);
    }
    if (description) {
      supportRequest.set(description);
    }
    await supportRequest.save();
    return res.status(200).send({ message: "Entity updated successfully" });
  } catch (error) {
    return res.status(400).send({ message: "Could not update an entity" });
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
    return res.status(400).send({ message: "Could not remove an entity" });
  }
};
