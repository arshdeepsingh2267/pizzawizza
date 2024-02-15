import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Orders() {
  const [orderData, setOrderData] = useState([]);
  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch("/api/myOrdersData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      // console.log(response);
      await setOrderData(response.orderData);
    });
  };
  useEffect(() => {
    fetchMyOrder();
  }, []);
  // console.log(orderData);
  return (
    <div className="container">
      <div className=" gap-4">
        {orderData.length > 0 ? (
          //   orderData[0]?.map((data) => {
          //     return data.orderData
          //       ? data.
          orderData[0]?.order_data
            .slice(0)
            .reverse()
            .map((item) => {
              return item.map((arrayData) => {
                return arrayData.Order_date ? (
                  <div
                    key={arrayData.Order_date}
                    className="m-auto text-xl ml-4 my-5"
                  >
                    {arrayData.Order_date}
                    <hr />
                  </div>
                ) : (
                  <div className="w-96 ml-10">
                    <div className="card rounded-lg mt-3 h-96">
                      <div className="relative w-full rounded-lg h-72">
                        <Image
                          src={arrayData.img}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg object-cover"
                          alt={arrayData.img}
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{arrayData.name}</h5>
                        <div className="flex items-center justify-between">
                          <span>{arrayData.qty}</span>
                          <span>{arrayData.size}</span>
                          {/* <span>{data}</span> */}
                          <span>₹{arrayData.price}/-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            })
        ) : (
          //   : "";
          //   })
          <div className="flex w-screen flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold"> No previous Orders 😅</h1>
            {/* <p className="text-gray-600 mt-4">No previous Orders 😅</p> */}
            <Link
              href="/"
              className="text-violet-500 text-xl hover:font-bold mt-8"
            >
              Go back to the home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
