/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// HOC/withAuth.jsx
import { useRouter } from "next/router";

// eslint-disable-next-line react/display-name

const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const user = sessionStorage.getItem("auth");

      if (!user) {
        Router.replace("/login");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

withAuth.displayName = "WithAuth";

export default withAuth;
