import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI; // Ensure this is defined in your environment
    if (!uri) {
      throw new Error("MongoDB URI is not defined");
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("error: database not connected");
    console.log(error);
  }
};

export default connectDB;
