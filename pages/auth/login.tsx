import { NextPage } from "next";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "../../styles/Login.module.css";

const Login: NextPage = () => {
  const [authForm, setAuthForm] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthForm({
      ...authForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(authForm);

    setAuthForm({
      email: "",
      password: "",
    });
  };

  return (
    <div className={styles.login}>
      <div className={styles.heading}>
        <h3>Hello,</h3>
        <p>Login to Shop101 or create an account, don't miss the discounts!</p>
      </div>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={authForm.email}
            onChange={(e) => handleChange(e)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={authForm.password}
            onChange={(e) => handleChange(e)}
            required
          />
          <button>Login</button>
        </form>
        <div className={styles.signupCta}>
            <p>Don't have an account? &nbsp;
              <Link href={"/auth/signup"}>
                <a>click here to sign up</a>
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
