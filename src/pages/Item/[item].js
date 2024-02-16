// import Card from "@/components/Card";
import Head from "next/head";
// import { useRouter } from "next/router";
import React from "react";
// import fs from "fs";
import Link from "next/link";
import Image from "next/image";
import { baseURL } from "@/utils/baseUrl";
function Item(props) {
  let data = props.data;

  return (
    // <div>Hello world - {router.query.item}</div>

    <div className="min-h-screen px-10">
      <Head>
        <title>Next Shopping</title>
      </Head>

      <Link href={"/"}>
        <div className="container max-w-md flex my-6 cursor-pointer hover:scale-125  justify-center items-center mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </Link>
      <div className="container border-gradient max-w-md p-6 md:p-8 mb-16 mx-auto  flex space-y-4 flex-col items-center justify-center">
        <div className="relative w-full h-96 rounded-lg lg:w-96">
          <Image
            src={data.img}
            className="rounded-lg"
            layout="fill"
            objectFit="cover"
            alt="item image"
          />
        </div>

        <div className="font-extrabold mb-2 text-base md:text-2xl uppercase ">
          {data.name}
        </div>
        <p className=" max-w-sm text-base md:text-lg text-gray-700 dark:text-gray-400 t">
          {data.description}
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const { item } = context.query;

  console.log("23234234", item);
  const pizzaItem = await fetch(baseURL + "api/getDataById", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item: item }),
  });
  let data = await pizzaItem.json();
  data = data.data;
  // console.log(data);
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
    },
  };
}

export default Item;
