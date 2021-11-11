import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi, { string } from 'joi';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  provider: {
    type: [String],
    required: true,
  },
  role: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
  collection: 'users',
});

userSchema.methods.generateAuthToken = (id) =>
  jwt.sign({ _id: id }, process.env.JWTPRIVATEKEY);

export const User = mongoose.model('User', userSchema);

export const userValidate = (user: any) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    provider: Joi.string().required(),
    role: Joi.number().required(),
  });
  return schema.validate(user);
};
