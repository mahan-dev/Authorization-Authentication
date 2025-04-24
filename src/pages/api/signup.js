import User from "@/models/user";
import { hashedPassword } from "@/utils/auth";
import connectDb from "@/utils/ConnectDb";

const handler = async (req, res) => {
  if (req.method !== "POST") return;

  try {
    await connectDb();
  } catch {
    res
      .status(500)
      .json({ status: "Failed", message: "can not connect to db" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ status: "Failed", message: "Invalid Data" });
  }

  const existUser = await User.findOne({ email: email });
  if (existUser) {
    return res
      .status(422)
      .json({ status: "Failed", message: "User already exists" });
  }
  const hashPassword = await hashedPassword(password);

  const newUser = await User.create({ email: email, password: hashPassword });

  res
    .status(200)
    .json({
      status: "Success",
      message: "SignedUp successfully",
      data: newUser,
    });
};
export default handler;
