import mongoose from 'mongoose';

const linkedinPostSchema = new mongoose.Schema({
  date: Date,
  iframe: String,
});

export default mongoose.model('linkedin-post', linkedinPostSchema);
