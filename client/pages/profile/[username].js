import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import { profileUser } from "../../actions/user";
import Layout from "../../components/Layout";
import ProfileUser from "../../components/user/ProfileUser";
import CardTranding from "../../components/blogs/CardTranding";
import Card from "../../components/blogs/Card";
import { APP_NAME, DOMAIN } from "../../config";

const profile = ({ user, blogs, query }) => {
  SwiperCore.use([Autoplay]);

  const tranding = () => {
    return blogs.map((blog) => (
      <SwiperSlide>
        <div className="px-2">
          <CardTranding blog={blog} />
        </div>
      </SwiperSlide>
    ));
  };

  const showBlogs = () => {
    return blogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
      </article>
    ));
  };

  const dataProfile = () => {
    return <ProfileUser user={user} />;
  };

  return (
    <>
      <Head>
        <title>
          {APP_NAME} - {user.name}
        </title>
        <meta name="description" content={`Blogs by ${user.username}`} />
        <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
        <meta property="og:title" content={`${user.name} | ${APP_NAME}`} />
        <meta property="og:description" content={`Blogs by ${user.username}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${DOMAIN}/profile/${query.username}`}
        />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta
          property="og:image"
          content={`${DOMAIN}/static/images/seoblog.jpg`}
        />
        <meta
          property="og:image:secure_url"
          content={`${DOMAIN}/static/images/seoblog.jpg`}
        />
        <meta property="og:image:type" content="image/jpg" />
      </Head>

      <Layout>
        <section className="container mx-auto px-4 roboto py-8">
          {dataProfile()}
          {/* tranding today */}
          <div className="flex flex-col md:flex-row justify-between items-baseline border-b playfair-display py-8 border-gray">
            <h1 className="uppercase md:text-[56px] text-5xl font-bold">
              blogs Today Tranding
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
          <div className="flex flex-col md:flex-row items-center gap-8 py-11 lg:py-8">
            <Swiper
              slidesPerView={3}
              autoplay={{ delay: 2000 }}
              loop={true}
              scrollbar={{ draggable: true }}
            >
              {tranding()}
            </Swiper>
          </div>
          {/* Other articles */}
          <div className="border-b border-gray">
            <div className="border-b border-gray py-8 ">
              <h1 className="playfair-display md:text-[56px] text-5xl font-bold uppercase">
                Other articles
              </h1>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 place-items-center auto-rows-fr gap-y-12 gap-x-8 py-8">
              {showBlogs()}
            </div>
            <div className="text-white playfair-display flex justify-center items-center py-4">
              <button className="md:py-4 md:px-24 py-2 px-6 text-xl mb-8 uppercase bg-black ">
                other articles
              </button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

profile.getInitialProps = ({ query }) => {
  return profileUser(query.username).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        user: data.user,
        blogs: data.blogs,
        query,
      };
    }
  });
};

export default profile;
