import Head from "next/head";
import React from "react";
import ForgotPassword from "../components/auth/ForgotPassword";

const forgot = () => {
  return (
    <>
      <Head>
        <title>Forgot password</title>
      </Head>
      <section className="container mx-auto px-4 roboto">
        <div className="text-4xl font-bold py-4">Forgot password</div>
        <div className="grid place-content-center items-center h-[90vh]">
          <ForgotPassword />
        </div>
      </section>
    </>
  );
};

export default forgot;
