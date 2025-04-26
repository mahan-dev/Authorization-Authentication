import { verifyToken } from "@/utils/auth";

export const pageValidation = (token, secretKey) => {
  const result = verifyToken(token, secretKey);
  if (result) {
    return {
      redirect: { destination: "/dashboard", permanent: false },
    };
  }
  return {
    props: {
      result,
    },
  };
};
