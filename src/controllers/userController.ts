import { Request, Response } from 'express';
import User, { IUser } from '../models/UserModel';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email, firstName, lastName, avatar } = req.body;
    const user = new User({ username, password, email, firstName, lastName, avatar });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.sendStatus(204);
    }

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({ token, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user || !(await user.comparePassword(oldPassword))) {
      return res.status(400).json({ message: 'Invalid old password' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error changing password', error });
  }
};

export const validateRefreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const newToken = generateToken(decoded.userId);
    res.status(200).json({ token: newToken });
  } catch (error) {
    res.status(500).json({ message: 'Error validating refresh token', error });
  }
};

export const getDummyData = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'This is dummy data' });
};