/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// HOC/loggedIn.jsx
import { useRouter } from "next/router";

// eslint-disable-next-line react/display-name

const loggedIn = (WrappedComponent: any) => {
  return (props: any) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const user = sessionStorage.getItem("auth");

      if (user) {
        Router.replace("/dashboard");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

loggedIn.displayName = "loggedIn";

export default loggedIn;
