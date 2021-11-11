import { Request, Response } from "express";
import { User } from "../../models/User";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.user._id).select("-password -__v");
    res.send(user);
  } catch (error) {
    res.send("An error occured");
  }
};