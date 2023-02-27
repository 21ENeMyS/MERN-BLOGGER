import Head from "next/head";
import React from "react";
import Reset from "../../../components/auth/Reset";

const reset = () => {
  return (
    <>
      <Head>
        <title>Reset password</title>
      </Head>
      <section className="container mx-auto px-4 h-screen roboto">
        <div className="text-4xl font-bold py-4">Reset password</div>
        <div className="grid place-content-center items-center h-[90vh]">
          <Reset />
        </div>
      </section>
    </>
  );
};

export default reset;
