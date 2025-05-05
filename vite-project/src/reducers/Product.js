import { createReducer } from "@reduxjs/toolkit";
const initialState={


}

export const CreateProductReducer = createReducer(initialState, (builder) => {
    builder
    .addCase("CreateProductRequest", (state) => {
      state.loading = true;
      console.log("Request initiated", state)
    })
    .addCase("CreateProductSuccess", (state, action) => {
      state.loading = false;
      state.status= action.payload;
    })
    .addCase("CreateProductFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
   
      

  });
  export const CreateProductReviewReducer = createReducer(initialState, (builder) => {
    builder
    .addCase("CreateReviewRequest", (state) => {
      state.loading = true;
      console.log("Request initiated", state)
    })
    .addCase("CreateReviewSuccess", (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase("CreateReviewFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
   
      

  });
  const initialStaterevie={
    reviews:[]
  }
  export const getProductReviewReducer = createReducer(initialStaterevie, (builder) => {
    builder
    .addCase("getProductAllReviewRequest", (state) => {
      state.loading = true;
      console.log("Request initiated", state)
    })
    .addCase("getProductAllReviewSuccess", (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    })
    .addCase("getProductAllReviewFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
   
      

  });
  
export const getAllProductReducer = createReducer(initialState, (builder) => {
  builder
  .addCase("getAllProductRequest", (state) => {
    state.loading = true;
    console.log("Request initiated", state)
  })
  .addCase("getAllProductSuccess", (state, action) => {
    state.loading = false;
    state.products = action.payload;
  })
  .addCase("getAllProductFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  
    

});

  
export const getAllSearchProductReducer = createReducer(initialState, (builder) => {
  builder
  .addCase("getAllSearchProductRequest", (state) => {
    state.loading = true;
    console.log("Request initiated", state)
  })
  .addCase("getAllSearchProductSuccess", (state, action) => {
    state.loading = false;
    state.products = action.payload;
  })
  .addCase("getAllSearchProductFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  
    


});

export const BookProductReducer = createReducer(initialState, (builder) => {
  builder
  .addCase("BookProductRequest", (state) => {
    state.loading = true;
    console.log("Request initiated", state)
  })
  .addCase("BookProductSuccess", (state, action) => {
    state.loading = false;
    state.product = action.payload;
  })
  .addCase("BookProductFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  
    

});

export const getProductdetailsReducer = createReducer(initialState, (builder) => {
  builder
  .addCase("getProductDetailsRequest", (state) => {
    state.loading = true;
    console.log("Request initiated", state)
  })
  .addCase("getProductDetailsSuccess", (state, action) => {
    state.loading = false;
    state.product = action.payload;
  })
  .addCase("getProductDetailsFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  
    

});