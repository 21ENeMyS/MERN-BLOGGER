import Head from "next/head";
import React from "react";
import { APP_NAME } from "../config";

const about = () => {
  const head = () => (
    <Head>
      <title>{APP_NAME} - About us</title>
    </Head>
  );
  return (
    <>
      {head()}
      <section className="container mx-auto px-4 roboto">
        <div className="py-4">
          <h1 className="playfair-display text-4xl font-bold py-4">About us</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus
            voluptates error totam. Facilis, laboriosam id totam fugit labore
            dicta neque mollitia accusantium distinctio blanditiis, maiores odit
            repudiandae harum obcaecati eaque aliquam quis voluptas in molestias
            ut aut cupiditate. Repudiandae distinctio repellendus quaerat
            eligendi ipsum beatae modi accusamus perspiciatis! Laudantium quas
            amet, facere consequatur natus hic quasi necessitatibus fugiat
            officia odio, esse itaque totam praesentium dolores soluta suscipit
            alias quaerat vel nemo voluptatibus nulla laboriosam. Nulla rem
            expedita doloribus aspernatur nemo quod? Quis nobis quo expedita
            laborum voluptas sunt, quidem est debitis reprehenderit natus
            quisquam temporibus modi saepe aliquam impedit molestias autem
            nesciunt vero minus repudiandae excepturi assumenda beatae. Ea
            obcaecati eligendi dicta ut. Itaque nulla veniam officiis delectus,
            pariatur voluptatum non sunt, optio nihil voluptas reiciendis vel
            neque earum quia culpa atque qui. Quidem ad sint eaque nulla rerum
            in sed perspiciatis, quasi amet repudiandae sapiente mollitia
            repellat, dolorem natus cumque, esse quaerat quas iure similique
            quod nesciunt. Sed possimus molestias, aperiam optio cum a
            perspiciatis rerum ad nam vel. Harum magni quibusdam, reiciendis
            libero suscipit inventore labore est quod natus sit dignissimos et
            placeat qui ea, quae reprehenderit corporis laudantium autem ad.
            Earum, quaerat repudiandae sequi esse, illum tenetur fugit quod ea
            odio optio aspernatur hic nulla quis odit nesciunt dolores iure quo
            sapiente amet animi necessitatibus repellendus et praesentium
            deserunt. Qui quo praesentium voluptatum aspernatur error, ullam
            repellendus quaerat, mollitia harum magni totam tenetur a eaque
            tempore amet saepe. Dolor, accusamus reprehenderit ex maxime modi
            optio itaque.
          </p>
        </div>
      </section>
    </>
  );
};

export default about;
