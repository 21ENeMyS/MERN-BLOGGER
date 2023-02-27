import Head from "next/head";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import { blogsWithCategories } from "../actions/blog";
import Layout from "../components/Layout";
import CardSlide from "../components/blogs/CardSlide";
import SmallCard from "../components/blogs/SmallCard";
import CardTranding from "../components/blogs/CardTranding";
import Link from "next/link";
import Card from "../components/blogs/Card";
import { APP_NAME, DOMAIN } from "../config";
import { withRouter } from "next/router";

const Index = ({ blogs, totalBlog, blogsLimit, blogsSkip, router }) => {
  SwiperCore.use([Autoplay]);

  const [limit, setLimit] = useState(blogsLimit);
  const [size, setSize] = useState(totalBlog);
  const [skip, setSkip] = useState(0);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    blogsWithCategories(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };
  // const myLoaderImg = ({ src }) => {
  //   return blogs.map((blog) => `${API}/blog/photo/${blog.slug}`);
  // };

  const trandCard = () => {
    return blogs.map((blog, i) => (
      <SwiperSlide key={i}>
        <div className="px-2">
          <CardTranding blog={blog} />
        </div>
      </SwiperSlide>
    ));
  };

  const highlights = () => {
    return blogs.map((blog, i) => (
      <SwiperSlide key={i}>
        <div className="px-3">
          <Card blog={blog} />
        </div>
      </SwiperSlide>
    ));
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => <Card blog={blog} key={i} />);
  };

  const blogHighlight = () => {
    return blogs.map((blog) => <Card blog={blog} />);
  };

  const head = () => (
    <Head>
      <title>{APP_NAME} - Home</title>
      <meta
        data-rh="true"
        name="title"
        content={`${APP_NAME} - Temukan inspirasi baru dan tips menulis untuk meningkatkan kualitas blog Anda di website bloger kami`}
      />
      <meta
        data-rh="true"
        name="description"
        content={`${APP_NAME}, Mulailah petualangan menulis Anda dengan website bloger kami. Dapatkan tips dan trik SEO yang efektif, inspirasi konten dan strategi pemasaran untuk meningkatkan trafik dan kredibilitas blog Anda.`}
      />
      <meta
        data-rh="true"
        name="twitter:description"
        content={`${APP_NAME}, Mulailah petualangan menulis Anda dengan website bloger kami. Dapatkan tips dan trik SEO yang efektif, inspirasi konten dan strategi pemasaran untuk meningkatkan trafik dan kredibilitas blog Anda.`}
      />
      <meta
        data-rh="true"
        name="twitter:image:src"
        content={`${DOMAIN}/dist/img/blogger21.png`}
      />
      <meta data-rh="true" name="twitter:site" content={`@${APP_NAME}`} />
      <meta
        data-rh="true"
        name="twitter:title"
        content={`${APP_NAME} - Temukan inspirasi baru dan tips menulis untuk meningkatkan kualitas blog Anda di website bloger kami`}
      />
      <meta
        data-rh="true"
        property="og:description"
        content={`${APP_NAME}, Mulailah petualangan menulis Anda dengan website bloger kami. Dapatkan tips dan trik SEO yang efektif, inspirasi konten dan strategi pemasaran untuk meningkatkan trafik dan kredibilitas blog Anda.`}
      />
      <meta
        data-rh="true"
        property="og:image"
        content={`${DOMAIN}/client/dist/img/blogger21.png`}
      />
      <meta data-rh="true" property="og:site_name" content={`${APP_NAME}`} />
      <meta
        data-rh="true"
        property="og:title"
        content={`${APP_NAME} - Temukan inspirasi baru dan tips menulis untuk meningkatkan kualitas blog Anda di website bloger kami`}
      />
      <meta data-rh="true" property="og:type" content="website" />
      <meta data-rh="true" property="og:url" content={`${DOMAIN}`} />
      <link
        data-rh="true"
        rel="search"
        type="application/opensearchdescription+xml"
        title={`${APP_NAME}`}
        href="/osd.xml"
      />

      <link data-rh="true" rel="canonical" href={`${DOMAIN}`} />
    </Head>
  );

  const showButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <div className="text-white playfair-display flex justify-center items-center py-4">
          <button
            className="md:py-4 my-4 md:px-24 py-2 px-6 text-xl mb-8 uppercase bg-black text-white playfair-display flex justify-center items-center "
            onClick={loadMore}
          >
            other articles
          </button>
        </div>
      )
    );
  };

  return (
    <>
      {head()}
      <Layout>
        <section className="container mx-auto px-4 ">
          <div className="flex flex-col lg:flex-row justify-between pt-4 roboto">
            <div className="w-[70%]">
              <Swiper
                slidesPerView={1}
                autoplay={{ delay: 2000 }}
                loop={true}
                scrollbar={{ draggable: true }}
              >
                {blogs.map((blog, i) => (
                  <SwiperSlide key={i}>
                    <CardSlide blog={blog} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className=" flex flex-col items-center gap-8 py-3 lg:py-0 w-full">
              {blogs.map((blog, i) => (
                <SmallCard blog={blog} key={i} />
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-baseline border-b playfair-display py-8 border-gray">
            <div className="uppercase md:text-[56px] text-5xl font-bold">
              Today Tranding
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center  gap-8 py-11 lg:py-8">
            <Swiper
              slidesPerView={3}
              autoplay={{ delay: 2000 }}
              loop={true}
              scrollbar={{ draggable: true }}
            >
              {trandCard()}
            </Swiper>
          </div>

          {/* blogs highlights */}
          <div className="py-8 ">
            <div className="border-b border-gray py-8">
              <div className="md:text-[56px] text-4xl uppercase font-bold playfair-display">
                Let's get read the articles
              </div>
            </div>
            <div className="py-8 flex flex-col md:flex-row gap-x-7 gap-y-8 md:gap-y-0">
              <Swiper
                slidesPerView={2}
                autoplay={{ delay: 5000 }}
                loop={true}
                scrollbar={{ draggable: true }}
              >
                {highlights()}
              </Swiper>
            </div>
          </div>
          {/* Blogs other */}
          <div className="border-b border-gray">
            <div className="border-b border-gray py-8 ">
              <div className="playfair-display md:text-[56px] text-5xl font-bold uppercase">
                Other articles
              </div>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 place-items-center auto-rows-fr gap-y-12 gap-x-8 py-8">
              {blogHighlight()}
              {showLoadedBlogs()}
            </div>
            {showButton()}
          </div>
        </section>
      </Layout>
    </>
  );
};

Index.getInitialProps = () => {
  const skip = 0;
  const limit = 3;
  return blogsWithCategories(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        totalBlog: data.size,
        blogsLimit: limit,
        blogsSkip: skip,
      };
    }
  });
};

export default withRouter(Index);
