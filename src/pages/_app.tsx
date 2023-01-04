import "./globals.css";
import "antd/dist/antd.css";
import App, { AppInitialProps } from "next/app";
import type { ApplicationProperties } from "@/types/ApplicationProperties";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AppContext } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/apollo";

function Application({ Component, pageProps }: ApplicationProperties): JSX.Element {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

Application.getInitialProps = async (appContext: AppContext): Promise<ApplicationProperties> => {
  const appProps: AppInitialProps = await App.getInitialProps(appContext);
  return { ...appProps } as unknown as ApplicationProperties;
};

export default Application;
