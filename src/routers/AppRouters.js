import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { login } from "../actions/auth";
import { startLoadNotes } from "../actions/notes";
import JournalScreen from "../components/journal/JournalScreen";

import AuthRouter from "./AuthRouter";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouters = () => {
  const [checking, setChecking] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLogged(true);

        dispatch(startLoadNotes(user.uid));
      } else {
        setIsLogged(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking]);

  if (checking) {
    return (
      <div>
        <h1>Wait...</h1>
        <img
          src="https://www.molaunhuevo.com/wp-content/uploads/2014/07/09-deescandalo2.jpg"
          alt="cat"
        />
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isLogged={isLogged}
          />
          <PrivateRoute
            exact
            path="/"
            component={JournalScreen}
            isLogged={isLogged}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouters;
