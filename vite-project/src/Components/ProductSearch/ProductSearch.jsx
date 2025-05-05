import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import { getProducts } from '../../action/Product';

const ProductSearch = () => {

const dispatch=useDispatch()
 const [searchinputdata,setSearchInputData]=useState({
	keyword:"",
	category:""
 })

 

  const submitSearchHandler = async (e) => {
    e.preventDefault();
    console.log(`Searching by `, searchinputdata.category,searchinputdata.keyword)
	dispatch(getProducts(searchinputdata.category,searchinputdata.keyword))
  };

  return (
    <div className="min-h-screen flex justify-center items-center" style={{ marginTop: "-200px" }}>
      <div className="container bg-indigo-500 rounded-lg p-14 mt-10">
        <form onSubmit={submitSearchHandler}>
          <h1 className="text-center font-bold text-white text-4xl">Find the perfect product</h1>
          <p className="mx-auto font-normal text-sm my-6 max-w-lg">
            Enter your selected product name or choose a category
          </p>
          <div className="sm:flex  items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between gap-5">
            <input
              className="text-base text-gray-400 flex-grow outline-none px-2"
              type="text"
              placeholder='Name of Prodcut'
              value={searchinputdata.keyword}
              onChange={(e)=>setSearchInputData({...searchinputdata, keyword:e.target.value})}
            />
			  <input
              className="text-base text-gray-400 flex-grow outline-none px-2"
              type="text"
              placeholder='Product Category'
              value={searchinputdata.category}
			  onChange={(e)=>setSearchInputData({...searchinputdata,category:e.target.value})}
            />
            <div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto">
          
              <button
                type="submit"
                className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductSearch;
