import React from "react";
import Link from "next/link";
import Head from "next/head";
import Dashboard from "../../../components/Dashboard";
import { FaTrashAlt } from "react-icons/fa";
import ReadAndDelete from "../../../components/crud/categories/ReadAndDelete";
import Admin from "../../../components/auth/Admin";

const categories = () => {
  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>
      <Admin>
        <Dashboard>
          <div className="container mx-auto px-2 py-3">
            <div className="flex justify-between items-center">
              <h1 className=" md:text-[56px] text-5xl font-bold ">
                Categories
              </h1>
              <Link href="/admin/crud/category">
                <a className="capitalize text-xl font-semibold py-2 px-6 bg-black text-white">
                  New Category
                </a>
              </Link>
            </div>
            <div className="py-4">
              <div className="flex flex-col">
                <div className="overflow-x-auto ">
                  <div className="inline-block w-full">
                    <ReadAndDelete />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dashboard>
      </Admin>
    </>
  );
};

export default categories;
