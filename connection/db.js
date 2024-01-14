import mongoose from "mongoose";

const Connection = async () => {
  try {
    const URL = process.env.DATABASE_URL;
    await mongoose.connect(URL, { useNewUrlParser: true });

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with Database", error);
  }
};

export default Connection;
