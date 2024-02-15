import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Signup() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  let [address, setAddress] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/userSignUp", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem("token", json.authToken);
      console.log(localStorage.getItem("token"));
      localStorage.setItem("userEmail", credentials.email);
      router.push("/");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        height: "90vh",
      }}
      className="flex justify-center items-center "
    >
      <div class="container mx-5 w-full max-w-md ">
        <form
          class="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="m-3">
            <label
              htmlFor="name"
              class="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              required
              type="text"
              class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter full name"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label
              htmlFor="email"
              class="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
            >
              Email address
            </label>
            <input
              required
              type="email"
              class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label
              htmlFor="address"
              class="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
            >
              Address
            </label>
            {/* <fieldset className="flex justify-between"> */}
            <input
              required
              type="text"
              class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              name="geolocation"
              placeholder='"Click the icon for current location"'
              value={credentials.geolocation}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
            {/* <div>
                <button
                  type="button"
                  //   onClick={handleClick}
                  name="geolocation"
                  className=" flex items-center mx-1 align-middle bg-white dark:bg-inherit place-content-center shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>{" "}
                </button>
              </div> */}
            {/* </fieldset> */}
          </div>

          <div className="m-3">
            <label
              htmlFor="exampleInputPassword1"
              class="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              required
              type="password"
              class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={credentials.password}
              onChange={onChange}
              placeholder="Set new password "
              name="password"
            />
          </div>
          <div className="space-x-2 m-3 mt-8">
            <button
              type="submit"
              class="border font-bold dark:border-gray-400 border-gray-900 rounded p-2 mr-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100"
            >
              Submit
            </button>
            <Link href={"/login"} style={{ all: "unset" }}>
              <button className="border font-bold dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100">
                Already a user?
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
