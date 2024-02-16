export async function loadFoodData() {
  const baseURL =
    process.env.NODE_ENV === "production"
      ? "https://pizzawizza.vercel.app/"
      : "http://127.0.0.1:3000/";
  const pizzaData = await fetch(baseURL + "api/foodData", {
    method: "GET",
  });
  let data = await pizzaData.json();
  data = data.data;
  return data;
}
