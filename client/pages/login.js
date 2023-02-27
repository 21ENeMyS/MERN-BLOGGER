import Head from "next/head";
import Image from "next/future/image";
import React from "react";
import Signin from "../components/auth/Signin";

const login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className="bg-white">
        <div className="flex items-center justify-center">
          <Signin />
          <div className="h-full w-full">
            <div className="absolute lg:relative top-0 left-0 right-0 bottom-0 bg-black/80 "></div>
            <Image
              width={1920}
              height={1080}
              src="/img/nature2.jpg"
              alt="login"
              className="object-cover bg-no-repeat object-[center_bottom] w-screen h-screen"
              // style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default login;
