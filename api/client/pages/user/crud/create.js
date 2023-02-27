import Head from "next/head";
import React from "react";
import CreateBlog from "../../../components/crud/blogs/CreateBlog";

const create = () => {
  return (
    <>
      <Head>
        <title>Create Blog</title>
      </Head>
      <section className="container mx-auto py-8 roboto">
        <h1 className="text-4xl py-5 font-bold">Create Blog</h1>
        <CreateBlog />
      </section>
    </>
  );
};

export default create;
