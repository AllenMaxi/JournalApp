import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, isLogged, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isLogged ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
