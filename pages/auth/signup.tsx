import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "../../styles/Signup.module.css";
import { GetStaticProps, NextPage } from "next";
import axios from "axios";

const Signup: NextPage = () => {
  const [authForm, setAuthForm] = useState<{
    email: string;
    password: string;
    name: string;
  }>({
    name: "",
    email: "",
    password: "",
  });

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
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className={styles.signup}>
      <div className={styles.heading}>
        <h3>Hello,</h3>
        <p>Login to Shop101 or create an account, don&apos;t miss the discounts!</p>
      </div>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={authForm.name}
            onChange={(e) => handleChange(e)}
            required
          />
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
          <button>Register</button>
        </form>
        <div className={styles.signupCta}>
          <p>
            Already have an account? &nbsp;
            <Link href={"/auth/login"}>
              <a>click here to login</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
