import { baseURL } from "./baseUrl";

export async function loadFoodData() {
  // const baseURL =
  //   process.env.NODE_ENV === "production"
  //     ? process.env.BASE_URL
  //     : "http://127.0.0.1:3000/";
  try {
    const pizzaData = await fetch(baseURL + "api/foodData", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((error) => error.message);
    // if (!pizzaData.ok) {
    //   throw new Error("data no fetched");
    // }
    // console.log(pizzaData);
    let data = await pizzaData;
    // data = data?.data;

    return await JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error.message);
  }
}
