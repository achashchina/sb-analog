import mongoose from 'mongoose';
import * as  dotenv from 'dotenv';
dotenv.config();

const connectMongo = async () => {
  const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };
  try {
    console.log(process.env.MONGODB_URI)
    const { connection } = await mongoose.connect(process.env.MONGODB_URI, options);

    connection.readyState == 1 ? Promise.resolve(true) : null;
  } catch (error) {
    Promise.reject(error);
    throw new Error(error)
  }
};

export default connectMongo;
