import axios from "axios";
import React, { useState } from "react";
import styles from "./registerForm.module.css";
import { Button, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { pageValidation } from "@/helper/pageValidation";
import { data } from "autoprefixer";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const signUpHandler = async () => {
    const duration = {
      duration: 2000,
    };
    if (!form.email || !form.password) {
      toast.error("Please fill-out all fields", { duration: 2000 });

      return;
    }

    try {
      const res = await axios.post("/api/signup", form);
      const data = await res.data;
      console.log(data.data);
      console.log(data.status);
      const status = data.status;
      if (status === "Success") {
        toast.success(status, {
          duration: 2000,
        });
        router.push("/sign-in");
      } else {
        toast.error(data.message || "something went wrong", duration);
      }
    } catch (error) {
      const response = error.response?.data.message;
      console.log(error)
      toast.error(response || "an error occurred", duration);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__form}>
        <h2 className="mb-3">Sign Up</h2>
        <div className={styles.form__items}>
          <input
            className={styles.items__input}
            type="text"
            name="email"
            placeholder="email"
            onChange={changeHandler}
          />
          <input
            className={styles.items__input}
            type="password"
            name="password"
            placeholder="password"
            onChange={changeHandler}
          />
        </div>

        <Button
          sx={{ mt: "1rem", textTransform: "none", fontSize: "1.3rem" }}
          variant="outlined"
          color="primary"
          onClick={signUpHandler}
        >
          {" "}
          sign up
        </Button>
      </div>
    </section>
  );
};

export default SignUp;

export const getServerSideProps = (context) => {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;
  return pageValidation(token, secretKey);
};
