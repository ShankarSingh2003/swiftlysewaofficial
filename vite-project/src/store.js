import { configureStore } from "@reduxjs/toolkit";
import {
 
  alluserReducer,
  userProfileReducer,
  userReducer
} from "./reducers/User";
import { bookServiceReducers, createServiceReducers, getAllServicesReducers, loggedinuserservicesreducer, SearchservicesByLocationreducer, Searchservicesreducer } from "./reducers/CreateService";
import { CreateProductReducer, CreateProductReviewReducer, getAllProductReducer, getProductdetailsReducer, getProductReviewReducer } from "./reducers/Product";



const store = configureStore({
 reducer: {
    user: userReducer,
    service:createServiceReducers,
    bookservice:bookServiceReducers,
  userprofile:userProfileReducer,
  loggedinuserservice:loggedinuserservicesreducer,
  Searchservices:Searchservicesreducer,
  SearchServicesByLocation:SearchservicesByLocationreducer,
  getAllServices:getAllServicesReducers,
  getAllUsers:alluserReducer,
  CreateProduct:CreateProductReducer,
  AllProducts:getAllProductReducer,
  getProducuctDetail:getProductdetailsReducer,

  createReview:CreateProductReviewReducer,
  getproductreview:getProductReviewReducer
  },
});

export default store;