import React, { useContext, useState } from 'react'
import UserProductCard from '../Components/UserProductCard/UserProductCard'
import ProductSearch from '../Components/ProductSearch/ProductSearch'


const Product = (products) => {
console.log(products)

  return (
  
  <>
    <ProductSearch /> 
    <UserProductCard products={products}/>
  </>
   
     

  )
}

export default Product
