import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Shippinginfo = () => {
  const [shippinginfodata, setShippinginfodata] = useState({
    address: "",
    country: "",
    city: "",
    state: "",
    pincode: "",
    number: "",
  });
  const location=useLocation()
  const product = location.state?.product || {}
console.log(product)
  const navigate = useNavigate();

  const submitshippinginfohandler = (e) => {
    e.preventDefault();
    navigate("/order", { state:{ shippinginfodata,product} }); // Navigate to order page with shipping data
  };

  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        <div className="m-auto">
          <div>
            <button
              type="button"
              className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-black rounded-md hover:bg-gray-900 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#FFFFFF"
              >
                <g>
                  <rect fill="none" height="24" width="24"></rect>
                </g>
                <g>
                  <g>
                    <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                  </g>
                </g>
              </svg>
              <span className="pl-2 mx-1">Create new shipping label</span>
            </button>
            <form onSubmit={submitshippinginfohandler}>
              <div className="mt-5 bg-white rounded-lg shadow">
                <div className="px-5 pb-5">
                  <input
                    placeholder="Address"
                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base bg-gray-200 rounded-lg focus:outline-none focus:ring-2"
                    onChange={(e) =>
                      setShippinginfodata({ ...shippinginfodata, address: e.target.value })
                    }
                  />
                  <input
                    placeholder="Country"
                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base bg-gray-200 rounded-lg focus:outline-none focus:ring-2"
                    onChange={(e) =>
                      setShippinginfodata({ ...shippinginfodata, country: e.target.value })
                    }
                  />
                  <input
                    placeholder="City"
                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base bg-gray-200 rounded-lg focus:outline-none focus:ring-2"
                    onChange={(e) =>
                      setShippinginfodata({ ...shippinginfodata, city: e.target.value })
                    }
                  />
                  <div className="flex gap-5">
                    <input
                      placeholder="State"
                      className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base bg-gray-200 rounded-lg focus:outline-none focus:ring-2"
                      onChange={(e) =>
                        setShippinginfodata({ ...shippinginfodata, state: e.target.value })
                      }
                    />
                    <input
                      placeholder="Pincode"
                      className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base bg-gray-200 rounded-lg focus:outline-none focus:ring-2"
                      onChange={(e) =>
                        setShippinginfodata({ ...shippinginfodata, pincode: e.target.value })
                      }
                    />
                  </div>
                  <input
                    placeholder="Number"
                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base bg-gray-200 rounded-lg focus:outline-none focus:ring-2"
                    onChange={(e) =>
                      setShippinginfodata({ ...shippinginfodata, number: e.target.value })
                    }
                  />
                  <div className="flex items-center pt-3">
                    <input type="checkbox" className="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent" />
                    <label htmlFor="safeAdress" className="block ml-2 text-sm text-gray-900">
                      Save as default address
                    </label>
                  </div>
                </div>
                <hr className="mt-4" />
                <div className="flex flex-row-reverse p-3">
                  <div className="flex-initial pl-3">
                    <button
                      type="submit"
                      className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-900 transition duration-300 transform active:scale-95 ease-in-out"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M8 9h8v10H8z" opacity=".3"></path>
                        <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path>
                      </svg>
                      <span className="pl-2 mx-1">Save</span>
                    </button>
                  </div>
                  <div className="flex-initial">
                    <button
                      type="button"
                      className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md hover:bg-red-200 hover:text-red-600 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M8 9h8v10H8z" opacity=".3"></path>
                        <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path>
                      </svg>
                      <span className="pl-2 mx-1">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shippinginfo;
