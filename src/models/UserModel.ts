import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

export interface IUser extends Document {
  username: string;
  password: string;
  isActive: boolean;
  avatar: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  avatar: { type: String, required: true }
});

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.pre<IUser>('save', function (next) {
  if (!this.avatar) {
    const defaultAvatarPath = path.join(__dirname, '..', 'asset', 'images', 'user-icon.png');
    const defaultAvatar = fs.readFileSync(defaultAvatarPath);
    this.avatar = `data:image/png;base64,${defaultAvatar.toString('base64')}`;
  }
  next();
});

export default mongoose.model<IUser>('User', UserSchema);