import { useCartContext } from "@/utils/ContextReducer";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

function Card(props) {
  const { state, dispatch } = useCartContext();
  const data = props.foodData;
  const [qty, setQty] = useState(1);
  const priceOptions = Object.keys(data.price);
  const [size, setSize] = useState(priceOptions[0]);
  // const priceRef = useRef();

  const foodType = Object.values(data.foodType).includes("n");
  const foodTypeCSS = foodType
    ? ` lowercase font-thin bg-white border-red-500 border mr-2 px-0.1 text-red-500`
    : `lowercase font-thin bg-white border-green-500 border mr-2 px-0.1 text-green-500`;

  const handleQty = (e) => {
    setQty(e.target.value);
  };
  // useEffect(() => {
  //   setSize(priceRef.current.value);
  // }, []);
  const handleOptions = (e) => {
    setSize(e.target.value);
  };
  const handleAddToCart = async () => {
    const updateItem = await state.find(
      (item) => item.tempId === data["_id"] + size
      // console.log(item.priceOption, item.size);
    );
    // .map((item) => {
    //   return [item.size, item.id];
    // });
    console.log(updateItem);
    if (!updateItem) {
      await dispatch({
        type: "ADD",
        id: data["_id"],
        tempId: data["_id"] + size,
        name: data.name,
        price: finalPrice,
        qty: qty,
        img: data.img,
        priceOption: size,
      });
      console.log(updateItem);
      return;
    }
    if (updateItem) {
      console.log("updating item", size, updateItem);
      await dispatch({
        type: "UPDATE",
        tempId: data["_id"] + size,
        price: finalPrice,
        qty: qty,
      });
    }
    // await state.filter(async (item) => {
    //   if (item.id === data["_id"]) {
    //     await dispatch({
    //       type: "UPDATE",
    //       id: data["_id"],
    //       price: finalPrice,
    //       qty: qty,
    //     });
    //   }
    // });

    // if (updateItem.length <= 1) {
    //   await dispatch({
    //     type: "ADD",
    //     id: data["_id"],
    //     name: data.name,
    //     price: finalPrice,
    //     qty: qty,
    //     img: data.img,
    //     priceOption: size,
    //   });
    //   console.log(data["_id"]);
    // }

    console.log(updateItem);
    console.log("---", state);
  };

  let finalPrice = qty * parseInt(data.price[size]);
  // console.log("####" + data["_id"]);
  return (
    <div className="box" key={data["_id"]}>
      <div className=" w-80 rounded-lg overflow-hidden bg-white dark:bg-black border-gradient">
        <Link
          href={{ pathname: "/Item/[item]" }}
          as={`Item/${data["_id"]}`}
          style={{ all: "unset", cursor: "pointer" }}
          key={data["_id"]}
        >
          <div className="relative w-full h-80">
            <Image src={data.img} layout="fill" objectFit="cover" alt="pizza" />
          </div>
          <div className="p-4">
            <div className="font-bold mb-2 text-xl uppercase ">
              <span className={foodTypeCSS}>●</span>
              {data.name}
            </div>

            <p className=" short_description text-gray-700 dark:text-gray-400 text-base">
              {data.description}
            </p>
          </div>
        </Link>
        <div className="flex px-4 justify-between">
          <select
            className=" h-100  p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300  border border-black dark:border-gray-400 rounded"
            // onClick={handleClick}
            onChange={handleQty}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className=" h-100 p-1 text-black hover:font-bold  cursor-pointer font-semibold dark:text-gray-300  border border-black dark:border-gray-400 rounded"
            // onClick={handleClick}
            onChange={handleOptions}
          >
            {priceOptions.map((options) => {
              return (
                <option
                  className="uppercase"
                  key={options}
                  // ref={priceRef}
                  value={options}
                  // defaultValue={priceOptions[0]}
                >
                  {options}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex  p-4 font-bold  justify-between">
          <button
            onClick={handleAddToCart}
            className="border dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100 "
          >
            Add to Cart
          </button>
          <p className="p-2 text-xl">₹{finalPrice}/-</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
