import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { isAuth } from "../../actions/auth";

const Admin = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    !isAuth() ? router.push(`/login`) : isAuth().role !== 1 && router.push("/");
  }, []);

  return <div>{children}</div>;
};

export default Admin;
