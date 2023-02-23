import Router from "next/router";
import React, { useEffect } from "react";
import { isAuth } from "../../actions/auth";

const Private = ({ children }) => {
  useEffect(() => {
    !isAuth() && Router.push(`/login`);
  }, []);
  return <div>{children}</div>;
};

export default Private;
