import React from "react";
import { Provider } from "react-redux";
import AppRouters from "./routers/AppRouters";
import { store } from "./store/store";

const JournalApp = () => {
  return (
    <Provider store={store}>
      <AppRouters />
    </Provider>
  );
};

export default JournalApp;
