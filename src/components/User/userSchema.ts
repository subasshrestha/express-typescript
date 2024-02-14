import mongoose from 'mongoose';

export interface IUser {
  wallet: string;
  role: 'user' | 'admin';
  nonce: number;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    wallet: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user',
    },
    nonce: {
      type: Number,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model('User', userSchema);
