import { Route, Redirect } from "react-router-dom";
import { useGlobalContextAuth } from "../../contexts/AuthContext";
import Loading from "../views/Loading";

function ProtectedRoute({ component: Component, ...rest }) {
  const { authState } = useGlobalContextAuth();
  const { authLoading, isAuthenticated } = authState;

  if (authLoading) {
    return <Loading />;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    ></Route>
  );
}

export default ProtectedRoute;
