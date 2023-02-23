import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import { readAll } from "../../actions/blog";
import { API } from "../../config";
import Image from "next/future/image";

const BlogBody = ({ blog }) => {
  SwiperCore.use([Autoplay]);
  const [blogs, setBlogs] = useState([]);
  const showBlogs = () => {
    readAll().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  useEffect(() => {
    showBlogs();
  }, []);

  const slideBlogs = (blog) => (
    <div className="relative px-2">
      <div className="md:absolute w-full md:min-h-[500px] h-[159px] hidden md:block bg-[#857D7D] mix-blend-multiply"></div>
      <Image
        src={`${API}/blog/photo/${blog.slug}`}
        // src="https://source.unsplash.com/500x350/?arts"
        alt={blog.title}
        width={1920}
        height={1080}
        className="object-center min-w-[350px] min-h-[500px] object-cover bg-no-repeat"
      />
      {/*  */}
      <div className="flex flex-col justify-center items-start md:items-center md:absolute  md:top-[40%] relative  md:w-10/12 md:text-white text-black  md:left-[10%] ">
        <div className="w-full py-4 text-wrap text-limit h-[65px]">
          {renderHTML(blog.excerpt)}
        </div>
        <div className="flex justify-between items-center uppercase text-xs">
          <div className="hidden md:block py-5">
            <div className="flex flex-wrap justify-center items-center">
              {blog.categories.map((c, i) => (
                <Link href={`/category/${c.slug}`} key={i}>
                  <a className="py-1 px-2 bg-white uppercase text-black">
                    {c.name}
                  </a>
                </Link>
              ))}
              <span className="px-3">
                {" "}
                {`${moment(blog.updatedAt).format("DD MMM")} `} -{" "}
                {`${moment(blog.updatedAt).fromNow()}`}
              </span>
            </div>
          </div>
          <div className="profile py-4">
            <Link href="">
              <a className="">
                | <span>by {blog.postedBy.name}</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const highlights = () => {
    return (
      <div className="py-8 flex flex-col md:flex-row gap-x-7 gap-y-8 md:gap-y-0">
        <Swiper
          slidesPerView={2}
          autoplay={{ delay: 2000 }}
          loop={true}
          scrollbar={{ draggable: true }}
        >
          {blogs.map((blog) => (
            <SwiperSlide>
              {" "}
              <div className="blog-highlight px-3">
                <Image
                  src={`${API}/blog/photo/${blog.slug}`}
                  alt={blog.title}
                  width={1290}
                  height={1080}
                  className="w-full h-[380px] object-cover object-center bg-no-repeat"
                />
                <div className="profile py-4">
                  <Link href="">
                    <a className="flex uppercase items-center">
                      <div className="relative w-[50px] h-[2px] bg-black"></div>
                      <span className="px-3 ">by {blog.postedBy.name}</span>
                    </a>
                  </Link>
                </div>
                <div className="text-primary ">
                  <Link href="">
                    <a className="playfair-display md:text-4xl text-2xl">
                      {blog.title}
                    </a>
                  </Link>
                  <div className="flex justify-start items-center uppercase py-5">
                    {blog.categories.map((c, i) => (
                      <Link href={`/category/${c.slug}`} key={i}>
                        <a className="py-2 px-4 bg-black text-white ">
                          {c.name}
                        </a>
                      </Link>
                    ))}
                    <span className="px-3 ">
                      {" "}
                      {`${moment(blog.updatedAt).format("DD MMM")} `} -{" "}
                      {`${moment(blog.updatedAt).fromNow()}`}
                    </span>
                  </div>

                  <Link href="">
                    <a>
                      <p className=" md:text-xl text-lg roboto">
                        {renderHTML(blog.excerpt)}
                      </p>
                    </a>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  const blogHighlight = () => {
    return blogs.map((blog, i) => (
      <div className="img-highlight" key={i}>
        <Image
          src={`${API}/blog/photo/${blog.slug}`}
          alt={blog.title}
          width={1920}
          height={1080}
          className="w-full h-[327px] object-cover object-center bg-no-repeat"
        />
        <div className="profile py-4">
          <Link href="">
            <a className="flex uppercase items-center">
              <div className="relative w-[25px] h-[2px] bg-black"></div>
              <span className="px-3 ">by {blog.postedBy.name}</span>
            </a>
          </Link>
        </div>
        <div className="text-primary ">
          <Link href="">
            <a className="playfair-display md:text-4xl text-2xl">
              {blog.title}
            </a>
          </Link>
          <div className="flex uppercase items-center text-sm md:text-md py-5">
            {blog.categories.map((c, i) => (
              <Link href={`/category/${c.slug}`} key={i}>
                <a className="py-2 px-4 bg-black text-white">{c.name}</a>
              </Link>
            ))}
            <span className="px-3 ">
              {" "}
              {`${moment(blog.updatedAt).format("DD MMM")} `} -{" "}
              {`${moment(blog.updatedAt).fromNow()}`}
            </span>
          </div>

          <Link href="">
            <a>
              <div className="md:text-xl text-md roboto ">
                {renderHTML(blog.excerpt)}
              </div>
            </a>
          </Link>
        </div>
      </div>
    ));
  };

  return (
    <section className="roboto">
      {/* Today tranding */}
      <div className="flex flex-col md:flex-row justify-between items-baseline border-b playfair-display py-8 border-gray">
        <h1 className="uppercase md:text-[56px] text-5xl font-bold">
          Today Tranding
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
      <div className="flex flex-col md:flex-row items-center  gap-8 py-11 lg:py-8">
        <Swiper
          slidesPerView={3}
          autoplay={{ delay: 2000 }}
          loop={true}
          scrollbar={{ draggable: true }}
        >
          {blogs.map((blog) => (
            <SwiperSlide>{slideBlogs(blog)}</SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* blogs highlights */}
      <div className="py-8 ">
        <div className="border-b border-gray py-8">
          <h1 className="md:text-[56px] text-4xl uppercase font-bold playfair-display">
            Let's get read the articles
          </h1>
        </div>
        {highlights()}
      </div>
      {/* Blogs other */}
      <div className="border-b border-gray">
        <div className="border-b border-gray py-8 ">
          <h1 className="playfair-display md:text-[56px] text-5xl font-bold uppercase">
            Other articles
          </h1>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 place-items-center auto-rows-fr gap-x-8 gap-y-0 py-3">
          {blogHighlight()}
        </div>
      </div>
    </section>
  );
};

export default BlogBody;
