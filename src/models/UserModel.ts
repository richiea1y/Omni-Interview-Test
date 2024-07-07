import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

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
  avatar: { type: String, required: true }
});

// Add this function to get the default avatar
const getDefaultAvatar = (): string => {
  const defaultAvatarPath = path.join(__dirname, '..', 'asset', 'images', 'user-icon.png');
  const defaultAvatar = fs.readFileSync(defaultAvatarPath);
  return `data:image/png;base64,${defaultAvatar.toString('base64')}`;
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