import moment from "moment";
import Image from "next/future/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { isAuth } from "../../actions/auth";
import { API } from "../../config";

const CardDashboard = ({ blog, deleteConfirm }) => {
  const [List, setList] = useState(false);
  const linkUpdate = (blog) => {
    return isAuth() && isAuth().role === 1 ? (
      <Link href={`/admin/crud/${blog.slug}`}>
        <a className="px-4 py-2 bg-yellow-500 text-black rounded">Update</a>
      </Link>
    ) : (
      <Link href={`/user/crud/${blog.slug}`}>
        <a className="px-4 py-2 bg-yellow-500 text-black rounded">Update</a>
      </Link>
    );
  };

  return (
    <div>
      <div className="absolute  cursor-pointer">
        <div
          className="flex text-black bg-white px-2 py-2 flex-end font-semibold justify-between items-center"
          onClick={(e) => setList(!List)}
        >
          <BsThreeDotsVertical />
        </div>
        {List && (
          <div className="p-2.5 capitalize font-medium rounded relative text-white ">
            <ul>
              <li
                className="list-unstyled p-2.5 border-b flex gap-3 border-gray capitalize"
                onClick={() => {
                  setList(false);
                }}
              >
                <button
                  onClick={() => deleteConfirm(blog.slug)}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
                {linkUpdate(blog)}
              </li>
            </ul>
          </div>
        )}
      </div>
      <Link href={`/blogs/${blog.slug}`}>
        <div className="img-highlight cursor-pointer">
          <Image
            src={`${API}/blog/photo/${blog.slug}`}
            alt={blog.title}
            width={1290}
            height={1080}
            className="w-full h-[327px] object-cover object-center bg-no-repeat"
          />
          <div className="flex uppercase items-center py-4 text-xs w-full">
            <div className="flex items-center w-full">
              {blog.categories.map((c) => (
                <Link href={`/category/${c.slug}`}>
                  <a className="py-2 px-4 bg-black text-white">{c.name}</a>
                </Link>
              ))}
              <span className="px-3">
                {`${moment(blog.updatedAt).format("DD MMM")}`} {"-"}
                {`${moment(blog.updatedAt).fromNow()}`}
              </span>
            </div>
            <Link href={`/profile/${blog.postedBy.username}`}>
              <a className="flex justify-end items-center w-40">
                <div className="relative w-[20px] h-[2px] bg-black"></div>
                <span className="px-3">by {blog.postedBy.name}</span>
              </a>
            </Link>
          </div>
          <div className="text-primary ">
            <Link href={`/blogs/${blog.slug}`}>
              <a className="text-2xl">{blog.title}</a>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardDashboard;
