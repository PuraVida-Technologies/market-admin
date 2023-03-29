import { Spin } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link'

import { LoadingOutlined } from "@ant-design/icons";
import { forgetPassword } from "@/services/auth";
import { notify } from "@/util/alertMessage";
import loggedIn from "@/HOC/loggedIn";

function ForgetPasswordPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const { push } = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await forgetPassword(email);
    
    if (response?.message) {
      notify(response.message, "success");
      push("/login");
      setIsLoading(false);
    } else {
      notify("An error occured", "error");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Forget Password | Pura Vida</title>
        <meta name="description" content="PuraVida" />
        <link rel="icon" href="/logo.svg" />
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
              <Link href='/login' className="login-form-forgot" passHref>
                Back to login
              </Link>
              <button onClick={handleLogin} className="custom-blue-btn">
                Submit
                {isLoading && <Spin style={{ color: "#fff", marginLeft: "1rem" }} indicator={antIcon} />}
              </button>
             
            </div>
          </div>
        </div>
        <div className="right-login-container">
          <div className="logo-img">
            <Image src="/logo.svg" alt="Pura Vida" width={"100%"} height={"100%"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default loggedIn(ForgetPasswordPage);
