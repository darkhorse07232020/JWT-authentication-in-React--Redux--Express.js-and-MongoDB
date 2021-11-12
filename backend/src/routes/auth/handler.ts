import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Joi from "joi";

import { User, userValidate } from "../../models/User";
import getConfirmCode from "../../services/confirmCode";
import sendConfirmationEmail from "../../services/mail";

const createConfirmRequest = async (userId: string) => {
  const user = await User.findById(userId);
  user.confirmationCode = getConfirmCode();

  const subject = "Please confirm your account";
  const html = `<h1>Email Confirmation</h1>;
  <h2>Hello ${user.firstName} ${user.lastName}</h2>
  <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
  <a href=${process.env.WEB_URL}/confirm/${user.confirmationCode}> Click here</a>
  </div>`;

  user.save();
  const res = await sendConfirmationEmail( user.email, subject, html);
  return res;
};

const createResetRequest = async (userId: string) => {
  const user = await User.findById(userId);
  user.confirmationCode = getConfirmCode();

  const subject = "Please Reset Your Password";
  const html = `<h1>Reset Password</h1>;
  <h2>Hello ${user.firstName} ${user.lastName}</h2>
  <p>You can reset your password by clicking the following link</p>
  <a href=${process.env.WEB_URL}/reset-password/${user.confirmationCode}> Click here</a>
  </div>`;

  user.save();
  const res = await sendConfirmationEmail( user.email, subject, html);
  return res;
};

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

    // if user is not activated
    if (user.status != "Active") {
      return res.status(401).send("Pending Account. Please Verify Your Email!");
    }
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
    res.status(400).send("An error occurred");
  }
};

export const autoLoginHandler = async (req: Request, res: Response) => {

  const user = await User.findById(req.body.user._id);
  if (!user) return res.status(401).send("Token expired");

  if (user.status != "Active") {
    return res.status(401).send("Pending Account. Please Verify Your Email!");
  }

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

    res.status(200).json({
      status: 'success', message: "Registered successfully. Please check your email"
    });

    createConfirmRequest(user._id);
  } catch (error) {
    res.status(400).send("An error occurred");
  }
};

export const requestVerify = async (req: Request, res: Response) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(404).send("User Not found.");
  }

  const result = await createConfirmRequest(user._id);
  if (result) {
    return res.status(200).send({status: 'success', message: "Verification Mail has sent successfully. Check your inbox or spam folder."});
  } else {
    return res.status(400).send("An error occurred");
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      confirmationCode: req.params.confirmationCode,
    });
    if (!user) {
      return res.status(404).send("User Not found.");
    }

    user.status = "Active";
    user.confirmationCode = getConfirmCode();
    user.save();

    const subject = "Please confirm your account";
    const html = `<h1>Congratulations!</h1>;
    <h2>Hello ${user.firstName} ${user.lastName}</h2>
    <p>You have already confirmed your email address.</p>
    <a href=${process.env.WEB_URL}/auth/login> Click here to Login</a>
    </div>`;

    await sendConfirmationEmail( user.email, subject, html);

    return res.status(200).json({
      status: 'success', message: "Account Confirmed"
    });
  } catch (error) {
    return res.status(400).send("An error occurred");
  }
}

export const requestReset = async (req: Request, res: Response) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  
  if (!user) {
    return res.status(404).send("User Not found.");
  }

  const result = await createResetRequest(user._id);
  if (result) {
    return res.status(200).send({status: 'success', message: "Reset link has sent successfully. Check your inbox or spam folder."});
  } else {
    return res.status(400).send("An error occurred");
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const { confirmationCode, password } = req.params;
    
    const user = await User.findOne({confirmationCode});
    if (!user) {
      return res.status(404).send("User Not found.");
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    user.password = await bcrypt.hash(password, salt);
    user.confirmationCode = getConfirmCode();

    user.save();

    const subject = "Reset your password";
    const html = `<h1>Congratulations!</h1>;
    <h2>Hello ${user.firstName} ${user.lastName}</h2>
    <p>You have changed your password successfully. Your new password is </p>
    <h3>${password}</h3>
    <a href=${process.env.WEB_URL}/auth/login> Click here to Login</a>
    </div>`;

    await sendConfirmationEmail( user.email, subject, html);
  
    return res.status(200).json({
      status: 'success', message: "Password changed successfully"
    });
  } catch (error) {
    return res.status(400).send("An error occurred");
  }
};

export const signInWithGoogle = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: "",
        provider: ["google"],
        role: 1,
      });
      console.log(user);
      await user.save();
    }

    // if user is not activated
    if (user.status != "Active") {
      return res.status(401).send("Pending Account. Please Verify Your Email!");
    }
    const token = user.generateAuthToken(user._id.toString());

    return res.status(200).json({
      status: 'success', message: "Login successfully", token: token, user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.log(error);
    
    return res.status(400).send("An error occurred");
  }
};
