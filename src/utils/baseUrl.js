export const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : "http://localhost:3000/";
console.log(process.env.BASE_URL);
