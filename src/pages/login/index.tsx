import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Head>
        <title>PuraVida | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="login-container">
        <div className="left-login-container">
          <div className="left-inner">
            <p className="login-header">Bitcoin</p>
            <p className="login-caption">Welcome back! Please enter your details </p>
            <form className="form-container">
              <div className="custom-form">
                <label htmlFor="email">Email</label>
                <input
                  className="custom-input"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="custom-form">
                <label htmlFor="password">Password</label>
                <input
                  className="custom-input"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="custom-blue-btn">Sign in</button>
            </form>
          </div>
        </div>
        <div className="right-login-container">
          <div className="logo-img">
            <Image src="/icons/pvb-logo.svg" alt="PVB Logo" width={"100%"} height={"100%"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
