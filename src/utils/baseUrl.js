export const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "http://localhost:3000/";
console.log(process.env.NEXT_PUBLIC_BASE_URL);
