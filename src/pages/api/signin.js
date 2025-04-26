import User from "@/models/user";
import { verifyPassword } from "@/utils/auth";
import connectDb from "@/utils/ConnectDb";
import { data } from "autoprefixer";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method !== "POST") return;

  const secretKey = process.env.SECRET_KEY;
  const cookieExpiration = 1 * 60 * 60 * 24;
  try {
    await connectDb();
  } catch {
    return res
      .status(500)
      .json({ status: "Failed", message: "can not connect to db" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json({ status: "Failed", message: "data is not valid" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "Failed", message: "user not found" });
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return res
      .status(422)
      .json({ status: "Failed", message: "user or pass is incorrect" });
  }

  const token = sign({ email }, secretKey, { expiresIn: cookieExpiration });
  const serialized = serialize("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: cookieExpiration,
  });

  res.status(200).setHeader("Set-Cookie", serialized).json({
    status: "Success",
    message: "loggedIn successfully",
    data: user.email,
  });
};

export default handler;
