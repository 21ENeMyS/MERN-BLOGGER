import Head from "next/head";
import React, { useState } from "react";
import { singleCategory } from "../../actions/category";
import Card from "../../components/blogs/Card";
import Layout from "../../components/Layout";
import { APP_NAME, DOMAIN } from "../../config";

const Index = ({
  category,
  blogs,
  query,
  totalBlogs,
  blogsLimit,
  blogsSkip,
}) => {
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const head = () => (
    <Head>
      <title className="capitalize">
        {APP_NAME} - {category.name}
      </title>
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

  const loadMore = () => {
    const toSkip = skip + limit;
    singleCategory(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => <Card blog={blog} key={i} />);
  };

  const buttonMore = () => {
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
        <section className="container mx-auto px-4">
          <div className="py-8 ">
            <div className="border-b border-gray">
              <div className="border-b border-gray py-8 ">
                <div className="playfair-display md:text-[56px] text-5xl font-bold uppercase">
                  {category.name}
                </div>
              </div>
              <div className="grid md:grid-cols-3 grid-cols-1 place-items-center auto-rows-fr gap-y-12 gap-x-8 py-8">
                {blogs.map((blog, i) => (
                  <Card blog={blog} key={i} />
                ))}
                {showLoadedBlogs()}
              </div>
              {buttonMore()}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

Index.getInitialProps = ({ query }) => {
  const limit = 3;
  const skip = 0;
  return singleCategory(query.slug, skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        category: data.category,
        blogs: data.blogs,
        query,
        totalBlogs: data.size,
        blogsSkip: skip,
        blogsLimit: limit,
      };
    }
  });
};

export default Index;
