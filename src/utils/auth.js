import { hash } from "bcrypt";

const hashedPassword = async (password) => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};
export { hashedPassword };
