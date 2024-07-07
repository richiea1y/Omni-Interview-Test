import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import fs from 'fs';
import config from '../config/config';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
  isActive: boolean;
  avatar: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  avatar: { type: String, required: false } // Changed to required: false
});

// Add this function to get the default avatar
const getDefaultAvatar = (): string => {
  try {
    const defaultAvatar = fs.readFileSync(config.defaultAvatarPath);
    return `data:image/png;base64,${defaultAvatar.toString('base64')}`;
  } catch (error) {
    console.error('Error reading default avatar:', error);
    // Return a fallback base64 string for a simple default avatar
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
  }
};

// Modify the pre-save hook
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password') && this.avatar) return next();

  if (!this.avatar) {
    this.avatar = getDefaultAvatar();
  }

  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

export default mongoose.model<IUser>('User', UserSchema);