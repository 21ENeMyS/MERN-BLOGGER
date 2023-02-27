import moment from "moment";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import renderHTML from "react-render-html";
import { API } from "../../config";

const BlogPage = ({ blog, related }) => {
  return (
    <>
      <Head>
        <title>{blog.title} | Blogger</title>
      </Head>
      <div className="relative -top-[76px]">
        <div className="md:absolute w-full md:min-h-full min-h-[159px] hidden md:block bg-[#857D7D] mix-blend-multiply"></div>
        <Image
          src={`${API}/blog/photo/${blog.slug}`}
          // src="https://source.unsplash.com/1920x1080/?art/"
          width={1920}
          height={1080}
          className="w-full max-h-[105vh] object-cover object-top bg-no-repeat"
        />
        <div className="absolute md:top-[45%] top-[45%] left-[10%] md:left-[50%] pr-4 mx-auto text-white">
          <h1 className="playfair-display md:text-5xl text-2xl">
            {blog.title}
          </h1>
          <div className="flex justify-start items-center uppercase md:text-md text-sm py-8 md:text-lg">
            <div className="py-5">
              {blog.categories.map((c) => (
                <Link href={`/category/${c.slug}`}>
                  <a className="py-1 px-2 bg-white text-black">{c.name}</a>
                </Link>
              ))}
            </div>
            <div className="pl-8">
              {" "}
              {`${moment(blog.updatedAt).format("DD MMM")} `} -{" "}
              {`${moment(blog.updatedAt).fromNow()}`}
            </div>
          </div>
        </div>
      </div>
      {/* grid grid-cols-1 md:grid-cols-2 gap-6 col-span-2 md:col-span-1 */}
      <div className="mx-auto container px-4 py-8">
        <div>{renderHTML(blog.body)}</div>
      </div>
      <div className="container px-4 mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-baseline border-b playfair-display py-8 border-gray">
          <h1 className="uppercase md:text-[56px] text-5xl font-bold">
            Read more
          </h1>
          <div className="flex justify-between gap-x-6 uppercase md:text-xl text-lg  pt-8">
            <Link href="">
              <a>All</a>
            </Link>
            <Link href="">
              <a>News</a>
            </Link>
            <Link href="">
              <a>Trend</a>
            </Link>
            <Link href="">
              <a>Populer</a>
            </Link>
          </div>
        </div>
        {/* <div className="flex flex-col md:flex-row items-center gap-8 py-11 lg:py-8"> */}
        {/* <div className="relative">
            <div className="md:absolute w-full md:min-h-[275px] h-[159px] hidden md:block bg-[#857D7D] mix-blend-multiply"></div>
            <img
              src="https://source.unsplash.com/500x350/?arts"
              alt=""
              className="object-center max-w-[350] max-h-[500px] object-cover bg-no-repeat"
            />
            <div className="flex flex-col justify-center items-start md:items-center md:absolute  md:top-[40%] relative  md:w-10/12 md:text-white text-black  md:left-[10%] ">
              <h1 className="w-full py-4 text-wrap">
                It is a long established fact that a reader will be distracted
                by the readable{" "}
              </h1>
              <div className="flex justify-between items-center uppercase text-xs">
                <div className="hidden md:block py-5">
                  <Link href="">
                    <a className="flex uppercase justify-center items-center">
                      <div className="py-1 px-2 bg-white  text-black">
                        NATURE
                      </div>
                      <span className="px-3">Nov 12 - 6 MINUTE AGO</span>
                    </a>
                  </Link>
                </div>
                <div className="profile py-4">
                  <Link href="">
                    <a className="">
                      | <span>by jhon elton</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
           */}
        {/* {blogsRelated()} */}
        {/* </div> */}
      </div>
    </>
  );
};

export default BlogPage;
