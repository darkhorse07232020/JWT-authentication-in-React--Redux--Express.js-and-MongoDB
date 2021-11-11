import { Request, Response } from "express";
import { User, userValidate } from "../../models/User";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from 'jsonwebtoken';

const signInValidate = (user: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    rememberMe: Joi.bool().required(),
  });
  return schema.validate(user);
};

export const signInHandler = async (req: Request, res: Response) => {
  try {
    const { error } = signInValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken(user._id.toString());

    res.status(200).json({
      status: 'success', message: "Login successfully", token: token, user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    res.send("An error occurred");
  }
};

export const autoLoginHandler = async (req: Request, res: Response) => {

  const user = await User.findById(req.body.user._id);
  if (!user) return res.status(401).send("Token expired");

  return res.status(200).json({
    status: 'success', message: "Autologin successfully", user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    }
  });
};

export const signUpHandler = async (req: Request, res: Response) => {
  try {
    const { error } = userValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (await User.findOne({ email: req.body.email })) {
      return res.status(409).send("Email is already registered");
    }

    const user = new User(req.body);

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken(user._id.toString());

    res.status(200).json({
      status: 'success', message: "Registered successfully", token: token, user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(400).send("An error occurred");
  }
};
