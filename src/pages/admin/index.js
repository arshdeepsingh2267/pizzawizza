// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Custom404 from "../404";

const pizzaPriceOptions = { regular: "", medium: "", large: "" };
const sidePriceOptions = { single: "", double: "" };

function Admin() {
  const [mounted, setMounted] = useState(false);
  // const router = useRouter();
  const [foodData, setFoodData] = useState({
    name: "",
    foodCategory: "",
    foodType: "",
    price: "",
    description: "",
    img: "",
  });

  const handleChange = (e) => {
    setFoodData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
    if (e.target.name === "foodCategory") {
      if (e.target.value === "Pizza") {
        setFoodData((prevData) => {
          return { ...prevData, price: pizzaPriceOptions };
        });
      } else if (e.target.value === "SIDES & BEVERAGES") {
        setFoodData((prevData) => {
          return { ...prevData, price: sidePriceOptions };
        });
      }
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/createFoodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodData),
    });
    const result = await response.json();
    if (result.success) {
      alert("Food Data created successfully");
    } else {
      alert("Failed to create");
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isAdmin")) === true) {
      setMounted(true);
    }
  }, []);

  return mounted ? (
    <div
      style={{
        background: "black",
        height: "90vh",
        backgroundSize: "cover",
      }}
      className="flex justify-center items-center "
    >
      <div className="container mx-5 w-full max-w-md ">
        <form
          onSubmit={handleCreate}
          className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Food Name
            </label>
            <input
              name="name"
              id="name"
              placeholder="Food name"
              value={foodData.name}
              type="text"
              required
              onChange={handleChange}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="foodCategory"
            >
              Food Category
            </label>
            <select
              name="foodCategory"
              placeholder="Food category"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              style={{ "-webkit-appearance": "auto" }}
              id="foodCategory"
              value={foodData.foodCategory}
              required={true}
              onChange={handleChange}
            >
              <option value="">Select food category</option>
              <option value="Pizza">PIZZA</option>
              <option value="SIDES & BEVERAGES">SIDES & BEVERAGES</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="foodType"
            >
              Food Type
            </label>
            <select
              name="foodType"
              placeholder="foodType"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              style={{ "-webkit-appearance": "auto" }}
              id="foodType"
              value={foodData.foodType}
              required={true}
              onChange={handleChange}
            >
              <option value="">Select food type</option>
              <option value="veg">Veg</option>
              <option value="nonveg">Non-Veg</option>
            </select>
          </div>

          {foodData.foodCategory !== "" && (
            <div className=" mb-4">
              <label
                className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Food Price
              </label>
              {foodData.price !== "" &&
                Object.keys(foodData.price).map((key) => (
                  <div key={key} className=" ml-4 mb-4">
                    <label
                      className="block text-gray-700  dark:text-gray-300 text-sm font-semibold mb-2"
                      htmlFor={key}
                    >
                      {key}
                    </label>
                    <input
                      type="number"
                      id={key}
                      required
                      name={key}
                      placeholder={`Price for ${key}`}
                      value={foodData?.price[key]}
                      onChange={(e) =>
                        setFoodData({
                          ...foodData,
                          price: { ...foodData.price, [key]: e.target.value },
                        })
                      }
                      className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                ))}
            </div>
          )}
          <div className=" mb-4">
            <label
              className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor={"description"}
            >
              Description
            </label>
            <textarea
              rows={4}
              required
              id="description"
              name={"description"}
              placeholder={`Write food description`}
              value={foodData.description}
              onChange={handleChange}
              className="shadow block appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className=" mb-4">
            <label
              className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor={"img"}
            >
              Food Image
            </label>
            <input
              required
              name={"img"}
              type="url"
              id={"img"}
              placeholder={`Image URL`}
              value={foodData.img}
              onChange={handleChange}
              className="shadow block appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* <input
            type="text"
            placeholder="Image URL"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          /> */}
          {/* img type file upload new FormData() */}
          <button
            className="border dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100 "
            onClick={handleCreate}
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  ) : (
    <Custom404 />
  );
}

export default Admin;
