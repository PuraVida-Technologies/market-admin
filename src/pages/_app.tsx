import "./globals.css";
import "antd/dist/antd.css";
import App, { AppInitialProps } from "next/app";
import type { ApplicationProperties } from "@/types";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AppContext } from "next/app";

function Application({ Component, pageProps }: ApplicationProperties): JSX.Element {
  return (
    <div>
      {" "}
      <NextNProgress
        color="#3653fe"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{ showSpinner: false }}
      />
      <ToastContainer />
      <Component {...pageProps} />
    </div>
  );
}

Application.getInitialProps = async (appContext: AppContext): Promise<ApplicationProperties> => {
  const appProps: AppInitialProps = await App.getInitialProps(appContext);
  return { ...appProps } as unknown as ApplicationProperties;
};

export default Application;
