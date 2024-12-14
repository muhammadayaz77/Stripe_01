
import mongoose from "mongoose";

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_CONN);
    console.log("database connected");
  } catch (error) {
    console.log("Error : ",error.message)
  }
}

export default connectDB;