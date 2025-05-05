import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createproductaction, getAllProducts } from "../../action/Product";
import Loader from "../Loader/Loader";



const CreateProductPage = () => {
  const { loading, error } = useSelector((state) => state.CreateProduct);
  console.log(error);

  const [createproductdata, setCreateProductData] = useState({
    name: "",
    description: "",
    Stock: 0,
    price: "",
    category: "", // category will hold the selected value from the dropdown
  });

  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.readyState === 2) {
          newImages.push(reader.result);
          setImages([...images, ...newImages]);
        }
      };
    });
  };

  const handleCreateService = async (e) => {
    e.preventDefault();

    await dispatch(
      createproductaction(
        createproductdata.name,
        createproductdata.description,
        images,
        createproductdata.price,
        createproductdata.Stock,
        createproductdata.category
      )
    );

    // toast("Product created successfully");
    dispatch(getAllProducts());
  };

  const handleReset = () => {
    setCreateProductData({
      name: "",
      description: "",
      Stock: 0,
      price: "",
      category: "",
    });
    setImages([]);
  };

  // Category options
  const categories = [
    "Electronics",
    "Clothing",
    "Home Appliances",
    "Books",
    "Furniture",
    "Sports Equipment",
    "Toys",
  ];

  return loading ? (
    <Loader />
  ) : (
    <section className="w-full flex justify-center items-center p-5">
      <div className="bg-[#dfa674] rounded-2xl flex flex-col md:flex-row max-w-4xl p-6 items-center w-full">
        {/* Form Section */}
        <div className="md:w-1/2 px-6">
          <h2 className="font-bold text-3xl text-[#002D74]">Create Product</h2>
          <p className="text-sm mt-2 text-[#002D74]">Admin Power.</p>

          <form className="flex flex-col gap-4 mt-4 text-black" onSubmit={handleCreateService}>
            <input
              className="p-2 rounded-xl border "
              type="text"
              name="name"
              placeholder="Name of Product"
              value={createproductdata.name}
              onChange={(e) => setCreateProductData({ ...createproductdata, name: e.target.value })}
            />

            <textarea
              className="p-2 rounded-xl border w-full"
              name="description"
              placeholder="Write some description"
              value={createproductdata.description}
              onChange={(e) => setCreateProductData({ ...createproductdata, description: e.target.value })}
            />

            <div className="flex gap-3">
              <input
                className="p-2 rounded-xl border w-full"
                type="text"
                name="price"
                placeholder="Price of Product"
                value={createproductdata.price}
                onChange={(e) => setCreateProductData({ ...createproductdata, price: e.target.value })}
              />

              <input
                className="p-2 rounded-xl border w-full"
                type="number"
                name="stock"
                placeholder="Add Stock"
                value={createproductdata.Stock}
                onChange={(e) => setCreateProductData({ ...createproductdata, Stock: Number(e.target.value) })}
              />
            </div>

            {/* Category Dropdown */}
            <select
              className="p-2 rounded-xl border w-full"
              name="category"
              value={createproductdata.category}
              onChange={(e) => setCreateProductData({ ...createproductdata, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Image Upload */}
            <div className="mx-auto max-w-xs">
              <label className="mb-1 block text-sm font-medium text-gray-700">Upload Images</label>
              <input
                type="file"
                multiple
                className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                className="bg-white border py-2 w-full rounded-xl flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium"
                type="submit"
              >
                Create Product
              </button>
              <button
                className="bg-red-500 text-white py-2 w-full rounded-xl flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-red-700 font-medium"
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Image Preview Section */}
        <div className="md:w-1/2 flex flex-wrap gap-2 justify-center p-4">
          {images.length > 0 ? (
            images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Preview ${index + 1}`}
                className="mt-2 rounded-lg w-24 h-24 object-cover border border-gray-300"
              />
            ))
          ) : (
            <img
              className="rounded-2xl max-h-[1600px] w-full"
              src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgbs&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Default"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default CreateProductPage;
