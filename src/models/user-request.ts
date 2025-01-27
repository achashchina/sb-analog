import mongoose from 'mongoose';

const userRequestSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  message: String,
});

export default mongoose.model('user-request', userRequestSchema);
