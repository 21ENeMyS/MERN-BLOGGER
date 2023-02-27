import Head from "next/head";
import React from "react";
import Admin from "../../../components/auth/Admin";
import UpdateBlog from "../../../components/crud/blogs/UpdateBlog";

const Update = () => {
  return (
    <>
      <Head>
        <title>Update Blog</title>
      </Head>
      <Admin>
        <section className="container mx-auto roboto py-5">
          <h1 className="py-4 text-4xl font-bold">Update Blog</h1>
          <UpdateBlog />
        </section>
      </Admin>
    </>
  );
};

export default Update;
