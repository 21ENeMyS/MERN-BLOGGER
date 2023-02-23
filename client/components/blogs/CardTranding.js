import moment from "moment";
import Image from "next/future/image";
import Link from "next/link";
import React from "react";
import renderHTML from "react-render-html";
import { API } from "../../config";

const CardTranding = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <div className="relative cursor-pointer">
        <div className="md:absolute w-full md:min-h-[500px] h-[159px] hidden md:block bg-[#857D7D] mix-blend-multiply"></div>
        <Image
          src={`${API}/blog/photo/${blog.slug}`}
          alt={blog.title}
          width={1920}
          height={1080}
          className="object-center min-w-[350px] min-h-[500px] object-cover bg-no-repeat"
        />

        <div className="flex flex-col justify-center items-start md:items-center md:absolute  md:top-[40%] relative  md:w-10/12 md:text-white text-black  md:left-[10%] ">
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <div className="w-full py-4 text-wrap text-limit h-[65px]">
                {renderHTML(blog.excerpt)}
              </div>
            </a>
          </Link>
          <div className="flex justify-between items-center uppercase text-xs">
            <div className=" uppercase justify-center items-center hidden md:block py-5">
              {blog.categories.map((c) => (
                <Link href={`/category/${c.slug}`}>
                  <a className="py-1 px-2 mr-1 bg-white text-black">{c.name}</a>
                </Link>
              ))}
              <span className="px-3">
                {`${moment(blog.updatedAt).format("DD MMM")}`}
                {"-"}
                {`${moment(blog.updatedAt).fromNow()}`}
              </span>
            </div>
            <div className="profile py-4">
              <Link href="">
                <a className="">| by {blog.postedBy.name}</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardTranding;
