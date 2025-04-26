import { Button } from "@mui/material";
import React, { useState } from "react";
import styles from "./registerForm.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import { pageValidation } from "@/helper/pageValidation";

const SignIn = () => {
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
  const signInHandler = async () => {
    if (!form.email || !form.password) {
      toast.error("Please fill-in all fields", {
        duration: 2000,
      });
      return;
    }
    try {
      const res = await axios.post("/api/signin", form);
      const data = await res.data;
      if (data.status === "Success") {
        toast.success(data.message, {
          duration: 2000,
        });
        await new Promise((resolver) => setTimeout(resolver, 2000));
        router.push("/dashboard");
      } else {
        toast.error("error", { duration: 2000 });
      }
    } catch {
      toast.error("Invalid credentials", {
        duration: 2000,
      });
    }
  };
  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__form}>
        <h2 className="mb-3">Sign In</h2>
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
          sx={{ mt: "1rem", textTransform: "none", fontSize: "1.5rem" }}
          variant="outlined"
          color="primary"
          onClick={signInHandler}
        >
          {" "}
          sign in
        </Button>
      </div>
    </section>
  );
};

export default SignIn;

export const getServerSideProps = (context) => {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;
  return pageValidation(token, secretKey);
};
