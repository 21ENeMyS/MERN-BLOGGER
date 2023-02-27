import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import { useRouter } from "next/router";
import { signup } from "../../../../actions/auth";

const ActivateAccount = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    token: "",
    error: "",
    loading: false,
    success: false,
    button: true,
  });

  const { name, token, loading, error, success, button } = values;

  useEffect(() => {
    let token = router.query.id;
    if (token) {
      const { name } = jwt.decode(token);
      setValues({ ...values, name, token });
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    signup({ token }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          button: false,
        });
      } else {
        setValues({ ...values, button: true, loading: false, success: true });
      }
    });
  };

  const Loading = () => (loading ? <h2>Loading...</h2> : "");

  const showError = () =>
    error ? (
      <div className="py-2 px-4 bg-red-500 text-white text-center">
        {error}{" "}
        <Link href="/register">
          <a className="underline underline-offset-4">,Go back</a>
        </Link>
      </div>
    ) : (
      ""
    );

  const showSuccess = () =>
    success ? (
      <div className="py-2 px-3 bg-green-500 text-white text-center">
        You have successfully activated your account.Please Signin
      </div>
    ) : (
      ""
    );

  const showButton = () =>
    button ? (
      <div
        className="py-2 px-4 bg-blue-600 text-white text-center cursor-pointer"
        onClick={handleSubmit}
      >
        Account Activate
      </div>
    ) : (
      ""
    );

  return (
    <section className="container mx-auto px-4 roboto">
      <div className="py-8 grid place-content-center h-screen">
        <h1 className="text-2xl">
          Hey <span className="font-bold playfair-display">{name}</span>,Ready
          to activate your account
        </h1>
        {Loading()}
        <div className="py-3">
          {error && showError()}
          {success && showSuccess()}
          {button && showButton()}
        </div>
      </div>
    </section>
  );
};

export default ActivateAccount;
