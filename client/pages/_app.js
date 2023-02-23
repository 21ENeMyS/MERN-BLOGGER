import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../node_modules/sweetalert2/src/sweetalert2.scss";
import "../node_modules/react-quill/dist/quill.snow.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Head from "next/head";
import Favicon from "../public/favicon.ico";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
