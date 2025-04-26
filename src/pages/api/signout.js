import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method !== "GET") return;
  const serialized = serialize("token", "",  { path: "/", maxAge: 0 });

  res
    .status(200)
    .setHeader("Set-Cookie", serialized)
    .json({ status: "Success", message: "logged out successfully" });
};

export default handler;
