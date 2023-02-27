import Head from "next/head";
import React from "react";
import CreateCategory from "../../../components/crud/categories/CreateCategory";

const category = () => {
  return (
    <>
      <Head>
        <title>Category Create</title>
      </Head>
      <section className="container mx-auto py-8 roboto">
        <h1 className="py-4 text-4xl font-bold">Create Category</h1>
        <CreateCategory />
      </section>
    </>
  );
};

export default category;
