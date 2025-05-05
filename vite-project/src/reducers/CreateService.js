import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const createServiceReducers = createReducer(initialState, (builder) => {
    builder
      .addCase("CreateServiceRequest", (state) => {
        state.loading = true;
        state.error=''
      })
      .addCase("CreateServiceSuccess", (state, action) => {
        state.loading = false;
        state.service = action.payload;
      })
      .addCase("CreateServiceFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("clearErrors", (state) => {
        state.error = null;
      })
      
      

  });
  const getAllServicesInitialState={
    allservices: [], // Initially no services
    loading: false,
    error: null,
  }
  export const getAllServicesReducers=createReducer(getAllServicesInitialState,(builder)=>{
    builder.addCase("GetAllServiceRequest", (state) => {
      state.loading = true;
    })
    .addCase("GetAllServiceSuccess", (state, action) => {
      state.loading = false;
      state.allservices = action.payload;
    })
    .addCase("GetAllServiceFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  })
const bookservicesinitialstate={
message:"", // Initially no services
  loading: false,
  error: null,
}
  export const bookServiceReducers = createReducer(bookservicesinitialstate, (builder) => {
    builder
     
    .addCase("BookServiceRequest", (state) => {
      state.loading = true;
    })
    .addCase("BookServiceSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("BookServiceFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    
      

  });



  const loggedinuserinitialstate={
    loggedinuserservice: [], // Initially no services
    loading: false,
    error: null,
  }
  export const loggedinuserservicesreducer = createReducer(loggedinuserinitialstate, (builder) => {
    builder
     
    .addCase("LoggedinServiceRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoggedinServiceSuccess", (state, action) => {
      state.loading = false;
      state.loggedinuserservice = action.payload;
    })
    .addCase("LoggedinServiceFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    
      

  });

  
  const searchserviceinitialstate={
    service:[],
    loading: false,
    error: null,
  }
  export const Searchservicesreducer = createReducer(searchserviceinitialstate, (builder) => {
    builder
     
    .addCase("SearchServiceRequest", (state) => {
      state.loading = true;
    })
    .addCase("SearchServiceSuccess", (state, action) => {
      state.loading = false;
      state.service = action.payload;
    })
    .addCase("SearchServiceFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
   
      

  });
const initialsearchstate={
  services: [], // Initially no services
  loading: false,
  error: null,
}
  export const SearchservicesByLocationreducer = createReducer(initialState, (builder) => {
    builder
    .addCase("SearchServiceLocationRequest", (state) => {
      state.loading = true;
      console.log("Request initiated", state)
    })
    .addCase("SearchServiceLocationSuccess", (state, action) => {
      state.loading = false;
      state.services = action.payload;
    })
    .addCase("SearchServiceLocationFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
   
      

  });




