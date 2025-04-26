import { verifyToken } from "@/utils/auth";
import axios from "axios";
import { useRouter } from "next/router";

import React from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const router = useRouter();
  const signoutHandler = async () => {
    try {
      const data = await axios.get("/api/signout");
      const result = await data.data;
      const success = result.status;
      if (success) {
        toast.success("signout successfully", {
          duration: 2000,
        });
        await new Promise((resolver) => setTimeout(resolver, 2000));
        router.push("/sign-up");
      }
    } catch (err) {
      toast.error("error", {
        duration: 2000,
      });
    }
  };

  return (
    <section>
      <h2>welcome to dashboard</h2>
      <button onClick={signoutHandler}>signout</button>
    </section>
  );
};

export default Dashboard;

export const getServerSideProps = (context) => {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;

  const result = verifyToken(token, secretKey);
  if (!result) {
    return {
      redirect: { destination: "/sign-in", permanent: false },
    };
  }
  return {
    props: {
      result,
    },
  };
};
