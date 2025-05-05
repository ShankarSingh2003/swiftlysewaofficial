import axios from "axios";

export const createServices =
  (servicename,description,price,image,user,location) => async (dispatch) => {
    try {
      console.log('image from createservice',image)
      dispatch({
        type: "CreateServiceRequest",
      });

      const { data } = await axios.post(
        "/api/v1/createservice",
        { servicename,description,price,image ,user,location},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "CreateServiceSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "CreateServiceFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const getAllServices =
  () => async (dispatch) => {
    try {
   
      dispatch({
        type: "GetAllServiceRequest",
      });

      const { data } = await axios.get(
        "/api/v1/getAllServices",
       
      );
console.log(data)
      dispatch({
        type: "GetAllServiceSuccess",
        payload: data.allservices,
      });
    } catch (error) {
      dispatch({
        type: "GetAllServiceFailure",
        payload: error.response.data.message,
      });
    }
  };
  export const BookService = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "BookServiceRequest",
      });
  
      // Fetch the order details from the backend
      const res = await axios.post("/api/v1/bookservice", { id });
      dispatch({
        type: "BookServiceSuccess",
        payload: res.data.message,
      });
  console.log(res.data)
      if (!res.data) {
        alert("Server error. Are you online?");
        return;
      }
     
      const {  order } = res.data;
      const amount=res.data.order.amount // The backend will return order info
    
  
      // Load Razorpay script dynamically
      function loadScript(src) {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      }
  
      const scriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  
      if (!scriptLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
 
      // Initialize Razorpay payment
      const options = {
        key: "rzp_test_fG2lz7qqMrm4xr", // Enter your Razorpay Key ID
        amount: amount.toString(),
        currency: "INR",
        order_id: order.id,
        name: "Sewa Swifites",
        description: "Test Transaction",
        handler: async function (response) {
          const data = {
            orderCreationId: order.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          console.log(response.razorpay_order_id)
  
          // Verify payment on backend
          const result = await axios.post("/api/v1/verifyPayment", {data , id});
  
          alert(result.data.msg);
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#61dafb",
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      dispatch({
        type: "BookServiceFailure",
        payload: error.response.data.message,
      });
    }
  };
  
  export const getLoggedinUserAllServices =
  () => async (dispatch) => {
    try {
   
      dispatch({
        type: "LoggedinServiceRequest",
      });

      const { data } = await axios.get(
        "/api/v1/loggedinuserservice",
       
      );

      dispatch({
        type: "LoggedinServiceSuccess",
        payload: data.loggedinuserservice
        ,
      });
    } catch (error) {
      dispatch({
        type: "LoggedinServiceFailure",
        payload: error.response.data.message,
      });
    }
  };


  export const SearchedServices =
  (serviceName) => async (dispatch) => {
    try {
   
      dispatch({
        type: "SearchServiceRequest",
      });

      const { data } = await axios.post(
        "/api/v1/getparticularserviceforcustomer",{
          serviceName
        }
       
      );

      dispatch({
        type: "SearchServiceSuccess",
        payload: data.service
        ,
      });
    } catch (error) {
      dispatch({
        type: "SearchServiceFailure",
        payload: error.response.data.message,
      });
    }
  };


export const SearchedServicesByLocation =
  (servicename, location, range) => async (dispatch) => {
    try {
      dispatch({
        type: "SearchServiceLocationRequest",
      });

      const { data } = await axios.post(
        "/api/v1/getParticularserviceaccordingtolocation",
        {
          servicename,
          location,
          range,
        }
      );

      // Ensure payload is serializable
  

      dispatch({
        type: "SearchServiceLocationSuccess",
        payload: data.services,
      });
    } catch (error) {
      dispatch({
        type: "SearchServiceLocationFailure",
        payload: error.response?.data?.message || "An error occurred",
      });
    }
  };
