import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

export const signIn = async (req: Request, res:Response) => {
  // Validate Email
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(404).json('Usuario Invalido');

  // Validate Password
  const isValidPassword: boolean = await user.validatePassword(req.body.password);
  if(!isValidPassword) return res.status(400).json('Contraseña Incorrecta');

  // Token
  const token: string = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET || 'jblog-dev', { expiresIn: 1800 });

  res.header('auth-token', token).json(user);
}

export const signUp = async (req: Request, res:Response) => {
  // Saving New User
  const user: IUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  user.password = await user.encryptPassword(user.password);
  const savedUser = await user.save();

  // Token
  const token: string = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET || 'jblog-dev', { expiresIn: 1800 });

  res.header('auth-token', token).json(savedUser);
}

export const profile = async (req: Request, res:Response) => {
  const user = await User.findById(req.userId, { password: 0 });
  if(!user) return res.status(404).json('Usuario no encontrado');
  res.json(user);
}