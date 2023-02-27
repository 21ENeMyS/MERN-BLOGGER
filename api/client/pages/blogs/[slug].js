import Link from "next/link";
import React, { useEffect, useState } from "react";
import { listRelated, readOne } from "../../actions/blog";
import BlogPage from "../../components/blogs/BlogPage";
import Layout from "../../components/Layout";
import CardTranding from "../../components/blogs/CardTranding";
import { APP_NAME, DOMAIN } from "../../config";
import Head from "next/head";

const SingleBlog = ({ blog, query }) => {
  const [message, setMessage] = useState("");
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelated({ blog }).then((data) => {
      data?.error ? setMessage(data?.error) : setRelated(data);
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);

  const blogsRelated = () => {
    return related?.map((blog, i) => <CardTranding blog={blog} key={i} />);
  };

  const showMessage = () => (
    <div className="px-4 py-4 bg-green-600 text-white text-lg"> </div>
  );

  const head = () => (
    <Head>
      <title>
        {APP_NAME} | {blog.title}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        content={`${API}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  return (
    <>
      {head()}
      <Layout>
        <section className="roboto">
          <BlogPage blog={blog} />
          <div className="flex flex-col md:flex-row items-center gap-8 py-11 lg:py-4">
            <div className="container mx-auto px-4">
              <div className="max-w-[350px] max-h-[500px]">
                {message ? showMessage() : blogsRelated()}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return readOne(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blog: data,
        query,
      };
    }
  });
};

export default SingleBlog;
