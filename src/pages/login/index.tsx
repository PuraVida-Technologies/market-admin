import { loginAdminService } from "@/services/auth";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { notify } from "@/util/alertMessage";
import { useRouter } from "next/router";
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
      console.log(response?.data, "is trhe data");
      notify("Login Successful", "success");
      sessionStorage.setItem("auth", JSON.stringify(response?.data));
      push("/dashboard");
      setIsLoading(false);
    } else {
      console.log(response?.errors);
      notify(response?.errors ? "Incorrect email or password" : "An error occured", "error");
      setIsLoading(false);
    }
  };

  // v3kh7vkd

  return (
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
            <button onClick={handleLogin} className="custom-blue-btn">
              Sign in
              {isLoading && <Spin style={{ color: "#fff", marginLeft: "1rem" }} indicator={antIcon} />}
            </button>
          </div>
        </div>
      </div>
      <div className="right-login-container">
        <div className="logo-img">
          <Image src="/icons/pvb-logo.svg" alt="PVB Logo" width={"100%"} height={"100%"} />
        </div>
      </div>
    </div>
  );
};

export default loggedIn(LoginPage);
