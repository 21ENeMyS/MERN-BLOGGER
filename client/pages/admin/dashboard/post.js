import Link from "next/link";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Dashboard from "../../../components/Dashboard";
import CardDashboard from "../../../components/blogs/CardDashboard";
import Admin from "../../../components/auth/Admin";
import { readAll, removed } from "../../../actions/blog";
import { getCookie } from "../../../actions/auth";
import { BsThreeDotsVertical } from "react-icons/bs";

const post = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const token = getCookie("token");

  const loadBlogs = () => {
    readAll().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const removedBlog = (slug) => {
    removed(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  const deleteConfirm = (slug) => {
    const answer = window.confirm(`Are you sure you want to delete ?`);
    answer && removedBlog(slug);
  };

  const showMessage = () => (
    <div className="px-4 py-4 bg-green-600 text-white text-lg">{message}</div>
  );

  return (
    <>
      <Head>
        <title>Articles</title>
      </Head>
      <Admin>
        <Dashboard>
          <div className=" container mx-auto px-2 py-3 ">
            <div className="flex justify-between items-center">
              <h1 className=" md:text-[56px] text-5xl font-bold ">Articles</h1>
              <Link href="/admin/crud/blog">
                <a className="capitalize text-xl font-semibold py-2 px-6 bg-black text-white">
                  New post
                </a>
              </Link>
            </div>
            <div className="py-4">
              {message && showMessage()}
              <div className="grid md:grid-cols-3 grid-cols-1 place-items-center auto-rows-fr gap-y-12 gap-x-8 py-8">
                {blogs.map((blog) => (
                  <CardDashboard blog={blog} deleteConfirm={deleteConfirm} />
                ))}
              </div>
            </div>
          </div>
        </Dashboard>
      </Admin>
    </>
  );
};

export default post;
