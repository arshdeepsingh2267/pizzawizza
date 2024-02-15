import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("api/userlogin", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("isAdmin", await JSON.parse(json.isAdmin));

      localStorage.setItem("token", json.authToken);
      router.push("/");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        height: "90vh",
        backgroundSize: "cover",
      }}
      className="flex justify-center items-center "
    >
      <div className="container mx-5 w-full max-w-md ">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              name="email"
              value={credentials.email}
              onChange={onChange}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              required
              placeholder="Enter username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              required
              value={credentials.password}
              onChange={onChange}
              name="password"
              placeholder="*******"
            />
            {/* <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p> */}
          </div>
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <button
                className="border font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100"
                type="submit"
              >
                Log in
              </button>
              <Link href={"/signup"} style={{ all: "unset" }}>
                <button className="border font-bold dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100">
                  New user?
                </button>
              </Link>
            </div>
            {/* <a
              className="inline-block  align-baseline font-bold text-sm text-gray-900 dark:text-gray-300 dark:hover:text-gray-400 hover:text-gray-700"
              href="#"
            >
              Forgot Password?
            </a> */}
          </div>
        </form>
        <p className="text-center text-gray-100 text-sm">
          &copy;2023 Pizza Wizza. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
