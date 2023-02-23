import Head from "next/head";
import React from "react";
import Private from "../../../components/auth/Private";
import UpdateBlog from "../../../components/crud/blogs/UpdateBlog";

const Update = () => {
  return (
    <>
      <Head>
        <title>Update Blog</title>
      </Head>
      <Private>
        <section className="container mx-auto roboto py-5">
          <h1 className="py-4 text-4xl font-bold">Update Blog</h1>
          <UpdateBlog />
        </section>
      </Private>
    </>
  );
};

export default Update;
