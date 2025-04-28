import { verifyToken } from "@/utils/auth";
import axios from "axios";
import { useRouter } from "next/router";
import DashboardInput from "@/module/dashboardInput";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import User from "@/models/user";
import connectDb from "@/utils/ConnectDb";

const Dashboard = ({ user }) => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    password: "",
  });

  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "name",
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "lastName",
    },
    {
      name: "password",
      type: "password",
      placeholder: "password",
    },
  ];
  const router = useRouter();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signoutHandler = async () => {
    try {
      const data = await axios.get("/api/signout");
      const result = await data.data;
      const success = result.status;
      if (success) {
        toast.success("signed-out successfully", {
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

  const sendHandler = async () => {
    const duration = {
      duration: 2000,
    };

    try {
      const res = await axios.post("/api/update-userDetail", form);
      const data = res.data;
      const success = data.status === "Success";
      if (success) {
        toast.success("successfully updated", duration);
        await new Promise((resolver) => setTimeout(resolver, 2000));
        router.reload();
      } else {
        toast.error("an error occurred", duration);
      }
    } catch (error) {
      toast.error("an error occurred", duration);
      console.log(error);
    }
  };

  return (
    <section className="text-white">
      <h2>welcome to dashboard</h2>
      <h4> hello {user.name}</h4>
      <button onClick={signoutHandler}>signout</button>
      {!user.name &&
        !user.lastName &&
        formFields.map((item) => {
          const { name, type, placeholder } = item;
          return (
            <div key={name}>
              <DashboardInput
                name={name}
                placeholder={placeholder}
                type={type}
                value={form[name]}
                changeHandler={changeHandler}
              />
            </div>
          );
        })}

      <Button
        onClick={sendHandler}
        sx={{
          textTransform: "none",
        }}
        variant="contained"
      >
        submit
      </Button>
    </section>
  );
};

export default Dashboard;

export const getServerSideProps = async (context) => {
  await connectDb();

  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;

  const result = verifyToken(token, secretKey);
  if (!result) {
    return {
      redirect: { destination: "/sign-in", permanent: false },
    };
  }

  const user = await User.findOne({ email: result.email });
  const parsedUser = JSON.parse(JSON.stringify(user));

  return {
    props: {
      user: parsedUser,
    },
  };
};
