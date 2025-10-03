"use client"

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../store";

const AdminReduxProvider = ({ children }: { children: ReactNode }) => {
  const store = makeStore();
  return <Provider store={store}>{children}</Provider>;
};

export default AdminReduxProvider;
