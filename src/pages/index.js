import Head from "next/head";

import Carousel from "@/components/Carousel";
import Card from "@/components/Card";
import { useState } from "react";

export default function Home(props) {
  let categories = new Set();
  const foodData = [];
  const [typeFilter, setTypeFilter] = useState(false);

  props.data?.map((data) => {
    return foodData.push(data), categories.add(data.category);
  });

  const categoryArray = [...categories];
  return (
    <>
      <Head>
        <title>Next Shopping</title>
      </Head>

      <Carousel />

      <div className="container mx-auto">
        <div className="my-6 space-x-5 ">
          <button
            className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${
              !typeFilter && "bg-slate-300 dark:bg-slate-600"
            }`}
            onClick={() => setTypeFilter(false)}
          >
            All
          </button>
          <button
            className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${
              typeFilter === "Veg" && "bg-slate-300 dark:bg-slate-600"
            } `}
            onClick={() => setTypeFilter("Veg")}
          >
            <span
              className={
                "lowercase font-thin bg-white border-green-500 border mr-2 px-0.1 text-green-500"
              }
            >
              ●
            </span>
            Veg
          </button>
          <button
            className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${
              typeFilter === "Non-Veg" && "bg-slate-300 dark:bg-slate-600"
            }`}
            onClick={() => setTypeFilter("Non-Veg")}
          >
            {" "}
            <span
              className={
                "lowercase font-thin bg-white border-red-500 border mr-2 px-0.1 text-red-500"
              }
            >
              ●
            </span>
            Non Veg
          </button>
        </div>
        {categoryArray?.map((category) => {
          return (
            <>
              <div
                key={category}
                className="text-4xl mt-10 mb-3 uppercase font-bold"
              >
                {category}
              </div>
              <hr></hr>
              <div
                className=" min-h-screen flex flex-col items-center
              justify-center"
              >
                <div className="grid  mx-auto  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {foodData
                    ?.filter((foodData) => category === foodData.category)
                    ?.filter((foodData) =>
                      typeFilter ? typeFilter === foodData.foodType : foodData
                    )
                    ?.map((data) => {
                      return <Card key={data} foodData={data} />;
                    })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const pizzaData = await fetch("/api/foodData", {
    method: "GET",
  });
  let data = await pizzaData.json();
  data = data.data;

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}
