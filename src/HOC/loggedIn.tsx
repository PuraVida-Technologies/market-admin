/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// HOC/loggedIn.jsx
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// eslint-disable-next-line react/display-name

const loggedIn = (WrappedComponent: any) => {
  return (props: any) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
      setIsClient(true);
    }, []);
    // checks whether we are on client / browser or server.
    if (isClient) {
      const Router = useRouter();

      const user = localStorage.getItem("auth");

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
