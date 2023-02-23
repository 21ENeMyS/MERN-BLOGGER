import Head from "next/head";
import React from "react";
import ProfileUpdate from "../../components/user/ProfileUpdate";

const updateUser = () => {
  return (
    <>
      <Head>
        <title>Update Blog</title>
      </Head>
      <section className="container mx-auto roboto py-5">
        <h1 className="py-4 text-4xl font-bold">Update User</h1>
        <ProfileUpdate />
      </section>
    </>
  );
};

export default updateUser;
