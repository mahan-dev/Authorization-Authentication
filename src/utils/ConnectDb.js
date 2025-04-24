const { default: mongoose } = require("mongoose");

const connectDb = async (res) => {
  const BaseUrl = process.env.MONGO_URI;
  mongoose.set("strictQuery", false);
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(BaseUrl);
    console.log("connect to database");
  } catch {
    console.log("Error connecting to database");
    res
      .status(500)
      .json({ status: "Failed", message: "Error connecting to database" });
  }
};
export default connectDb;
