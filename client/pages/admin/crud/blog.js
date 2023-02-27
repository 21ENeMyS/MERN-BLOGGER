import Head from "next/head";
import React from "react";
import CreateBlog from "../../../components/crud/blogs/CreateBlog";

const blog = () => {
  return (
    <>
      <Head>
        <title>Create Blog</title>
      </Head>
      <section className="container mx-auto roboto py-5">
        <h1 className="py-4 text-4xl font-bold">Create Blog</h1>
        <CreateBlog />
      </section>
    </>
  );
};

export default blog;
