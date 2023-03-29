import { Spin } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link'
import type { NextPage } from "next";

import { LoadingOutlined } from "@ant-design/icons";
import { loginAdminService } from "@/services/auth";
import { notify } from "@/util/alertMessage";
import loggedIn from "@/HOC/loggedIn";

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const { push } = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await loginAdminService(email, password);
    if (response?.data) {
      notify("Login Successful", "success");
      localStorage.setItem("auth", JSON.stringify(response?.data));
      push("/dashboard");
      setIsLoading(false);
    } else {
      notify(response?.errors ? "Incorrect email or password" : "An error occured", "error");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Pura Vida</title>
        <meta name="description" content="PuraVida" />
        <link rel="icon" href="/icons/Logo2.png" />
      </Head>

      <div className="login-container">
        <div className="left-login-container">
          <div className="left-inner">
            <p className="login-header">Bitcoin</p>
            <p className="login-caption">Welcome back! Please enter your details </p>
            <div className="form-container">
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
                  type={"password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Link href='/forget-password' className="login-form-forgot" passHref>
                Forgot password?
              </Link>
              <button onClick={handleLogin} className="custom-blue-btn">
                Sign in
                {isLoading && <Spin style={{ color: "#fff", marginLeft: "1rem" }} indicator={antIcon} />}
              </button>
             
            </div>
          </div>
        </div>
        <div className="right-login-container">
          <div className="logo-img">
            <Image src="/icons/Logo2.png" alt="Pura Vida" width={"100%"} height={"100%"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default loggedIn(LoginPage);
