import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import App, { AppInitialProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import type { AppContext } from "next/app";

import "./globals.css";
import type { ApplicationProperties } from "@/types/ApplicationProperties";

function Application({ Component, pageProps }: ApplicationProperties): JSX.Element {
  return (
    <>
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
      </>
  );
}

Application.getInitialProps = async (appContext: AppContext): Promise<ApplicationProperties> => {
  const appProps: AppInitialProps = await App.getInitialProps(appContext);
  return { ...appProps } as unknown as ApplicationProperties;
};

export default Application;
