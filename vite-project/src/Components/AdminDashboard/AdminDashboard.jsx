import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import CreateProductpage from "../CreateProductpage/CreateProductpage";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../action/Product";
import Loader from "../Loader/Loader";

const AdminDashboard = ({ users, user }) => {
  const { products, loading } = useSelector((state) => state.AllProducts);
  console.log(products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const [activeTab, setActiveTab] = useState("users"); // Default to 'users'

  return loading ?<Loader/>: (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
        {/* Sidebar */}
        <div className="bg-white dark:bg-gray-900 dark:border-gray-800 w-20 sm:w-64 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex">
          <div className="h-16 text-blue-500 flex items-center justify-center">
            <svg
              className="w-9"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 54 33"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 ..."
                clipRule="evenodd"
              />
            </svg>
          </div>
          {/* Sidebar buttons */}
          <div className="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-4">
            <button
              className={`h-10 w-12 rounded-md flex items-center justify-center ${
                activeTab === "users" ? "bg-blue-100 text-blue-500" : ""
              }`}
              onClick={() => setActiveTab("users")}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </button>

            <button
              className={`h-10 w-12 rounded-md flex items-center justify-center ${
                activeTab === "allProducts" ? "bg-blue-100 text-blue-500" : ""
              }`}
              onClick={() => setActiveTab("allProducts")}
            >
              📦
            </button>

            <button
              className={` rounded-md flex items-center justify-center ${
                activeTab === "createProduct" ? "bg-blue-100 text-blue-500" : ""
              }`}
              onClick={() => setActiveTab("createProduct")}
            >
              ➕
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow overflow-hidden h-full flex flex-col">
          <div className="h-16 lg:flex w-full border-b border-gray-200 dark:border-gray-800 hidden px-10">
            <div className="flex h-full text-gray-600 dark:text-gray-400">
              <a
                className={`cursor-pointer h-full border-b-2 inline-flex items-center mr-8 ${
                  activeTab === "users"
                    ? "border-blue-500 text-blue-500 dark:text-white dark:border-white"
                    : "border-transparent"
                }`}
                onClick={() => setActiveTab("users")}
              >
                Users
              </a>

              <a
                className={`cursor-pointer h-full border-b-2 inline-flex items-center mr-8 ${
                  activeTab === "allProducts"
                    ? "border-blue-500 text-blue-500 dark:text-white dark:border-white"
                    : "border-transparent"
                }`}
                onClick={() => setActiveTab("allProducts")}
              >
                All Products
              </a>

              <a
                className={`cursor-pointer h-full border-b-2 inline-flex items-center ${
                  activeTab === "createProduct"
                    ? "border-blue-500 text-blue-500 dark:text-white dark:border-white"
                    : "border-transparent"
                }`}
                onClick={() => setActiveTab("createProduct")}
              >
                Create Product
              </a>
            </div>
          </div>

          {/* Content Rendering */}
          <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto p-7 w-full">
            {activeTab === "users" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" key={'users'}>
                {users && users.length > 0 ? (
                  <>
                    {users.map((user, index) => (
                      <div className="xl:w-72 w-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5" key={index}>
                        <div className="space-y-4 mt-3">
                          <button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
                            <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
                              <img
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=046c29138c1335ef8edee7daf521ba50"
                                className="w-7 h-7 mr-2 rounded-full"
                                alt="profile"
                              />
                              {user?.name}
                            </div>
                          </button>
                          <span className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow-lg relative ring-2 ring-blue-500 focus:outline-none">
                            {user?.email}
                          </span>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>No Users Found</>
                )}
              </div>
            )}

            {activeTab === "allProducts" && (
              <div>
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>
                    {products && products.length > 0 ? (
                      <>
                        {products.map((product, i) => (
                          <div className="bg-gray-100 dark:bg-gray-800 py-8" key={i}>
                            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                              <div className="flex flex-col md:flex-row -mx-4">
                                <div className="md:flex-1 px-4">
                                  <div className="h-[28.75rem] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                    {product.images.length === 1 ? (
                                      <img className="w-full h-full object-cover" src={product.images[0].url} alt="Product Image" />
                                    ) : (
                                      <>
                                        <div
                                          id="default-carousel"
                                          className="relative w-full"
                                          data-carousel="slide"
                                        >
                                          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                                            {product.images.map((image, i) => (
                                              <div className="duration-700 ease-in-out" data-carousel-item key={i}>
                                                <img
                                                  src={image.url}
                                                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                                  alt="..."
                                                />
                                              </div>
                                            ))}
                                          </div>

                                          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                                            {product.images.map((_, i) => (
                                              <button
                                                type="button"
                                                className="w-3 h-3 rounded-full"
                                                aria-current={i === 0 ? "true" : "false"}
                                                aria-label={`Slide ${i + 1}`}
                                                key={i}
                                                data-carousel-slide-to={i}
                                              ></button>
                                            ))}
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="md:flex-1 px-4">
                                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                    {product.name}
                                  </h2>
                                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    {product.description}
                                  </p>
                                  <div className="flex mb-4">
                                    <div className="mr-4">
                                      <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                                      <span className="text-gray-600 dark:text-gray-300">{product.price}</span>
                                    </div>
                                    <div>
                                      <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                                      <span className="text-gray-600 dark:text-gray-300">
                                        {parseFloat(product.Stock) > 1 ? "In Stock" : "Out of Stock"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <span>No Product Found</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "createProduct" && (
              <div>
                <CreateProductpage />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
