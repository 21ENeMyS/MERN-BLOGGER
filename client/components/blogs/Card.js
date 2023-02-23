import moment from "moment";
import Image from "next/future/image";
import Link from "next/link";
import React from "react";
import renderHTML from "react-render-html";
import { API } from "../../config";

const Card = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <div className="img-highlight cursor-pointer">
        <Image
          src={`${API}/blog/photo/${blog.slug}`}
          width={1920}
          height={1080}
          alt={blog.title}
          className="w-full h-[327px] object-cover object-center bg-no-repeat"
        />
        <div className="profile py-4">
          <Link href={`/profile/${blog.postedBy.username}`}>
            <a className="flex uppercase items-center">
              <div className="relative w-[50px] h-[2px] bg-black"></div>
              <span className="px-3 ">by {blog.postedBy.name}</span>
            </a>
          </Link>
        </div>
        <div className="text-primary ">
          <Link href={`/blogs/${blog.slug}`}>
            <a className="playfair-display md:text-4xl text-2xl">
              {blog.title}
            </a>
          </Link>
          <div className="flex items-center justify-start uppercase text-sm md:text-md py-5">
            {blog.categories.map((c) => (
              <Link href={`/category/${c.slug}`}>
                <a className="py-2 px-4 bg-black mr-1 text-white">{c.name}</a>
              </Link>
            ))}
            <span className="px-3 ">
              {" "}
              {`${moment(blog.updatedAt).format("DD MMM")} `} -{" "}
              {`${moment(blog.updatedAt).fromNow()}`}
            </span>
          </div>

          <div className="md:text-xl text-md roboto ">
            {renderHTML(blog.excerpt)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
