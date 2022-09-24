import "./globals.css";
import "antd/dist/antd.css";
import App, { AppInitialProps } from "next/app";
import type { ApplicationProperties } from "@/types";
import type { AppContext } from "next/app";

function Application({ Component, pageProps }: ApplicationProperties): JSX.Element {
  return <Component {...pageProps} />;
}

Application.getInitialProps = async (appContext: AppContext): Promise<ApplicationProperties> => {
  const appProps: AppInitialProps = await App.getInitialProps(appContext);
  return { ...appProps } as unknown as ApplicationProperties;
};

export default Application;
