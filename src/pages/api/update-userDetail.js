import User from "@/models/user";
import { verifyPassword, verifyToken } from "@/utils/auth";
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

  const { name, lastName, password } = req.body;
  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;

  if (!token) {
    return res.status(401).json({
      status: "Failed",
      message: "Your'e not loggedIn",
    });
  }

  const result = verifyToken(token, secretKey);

  if (!result) {
    return res.status(401).json({
      status: "Failed",
      message: "Your'e Unauthorized",
    });
  }

  const user = await User.findOne({ email: result.email });

  if (!user) {
    res.status(404).json({
      status: "Failed",
      message: "User doesn't exist",
    });
  }
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return res
      .status(422)
      .json({ status: "Failed", message: "pass is not correct" });
  }

  

  user.name = name;
  user.lastName = lastName;
  await user.save();
  res.status(200).json({
    status: "Success",
    data: { name, lastName, email: result.email },
  });
};

export default handler;
