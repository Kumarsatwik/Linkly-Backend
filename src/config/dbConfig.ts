import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://litkumarsatwik2017:2aSNkAUMAuNRq7Rp@cluster0.wgskbgm.mongodb.net/urlshortener"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDb;
