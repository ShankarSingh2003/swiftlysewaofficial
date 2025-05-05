import axios from "axios";

export const createproductaction =
(name,description,images,price,Stock,category) => async (dispatch) => {
  try {
 console.log(name,description,images,price,Stock,category)
    dispatch({
      type: "CreateProductRequest",
    });

    const { data } = await axios.post(
      "/api/v1/admin/product/new",{
        name,description,images,Stock ,price,category
      }
     
    );

    dispatch({
      type: "CreateProductSuccess",
      payload: data.product
      ,
    });
  } catch (error) {
    dispatch({
      type: "CreateProductFailure",
      payload: error.response.data.message,
    });
  }
};
export const getAllProducts =
() => async (dispatch) => {
  try {
 
    dispatch({
      type: "getAllProductRequest",
    });

    const { data } = await axios.get(
      "/api/v1/admin/products"
     
    );
console.log(data)
    dispatch({
      type: "getAllProductSuccess",
      payload: data.products
      ,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductFailure",
      payload: error.response.data.message,
    });
  }
};


  export const getProducts =
(category,keyword="", currentPage = 1, price = [0, 25000],  ratings = 0) => async (dispatch) => {
  try {
 
    dispatch({
      type: "getAllProductRequest",
    });
    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    const { data } = await axios.get(
    link
     
    );
console.log(data)
    dispatch({
      type: "getAllProductSuccess",
      payload: data.products
      ,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductFailure",
      payload: error.response.data.message,
    });
  }
};
export const Bookproduct = (id,shippinginfodata) => async (dispatch) => {
  console.log(id,shippinginfodata)
  try {
    dispatch({
      type: "CreateProductRequest",
    });

    // Fetch the order details from the backend
    const res = await axios.post("/api/v1/bookproduct", { id,shippinginfodata });

    dispatch({
      type: "CreateProductSuccess",
      payload: res.data.message
    });
console.log(res.data)
    if (!res.data) {
      alert("Server error. Are you online?");
      return;
    }
    console.log(res.data)
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
        const result = await axios.post("/api/v1/verifyPayment", {data , id,shippinginfodata});

        alert(result.data.msg);
      },
      prefill: {
        name: "Shankar privited",
        email: "shankrpvtltd@gmail.com",
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

export const getProductDetail =
(id) => async (dispatch) => {
  try {
 
    dispatch({
      type: "getProductDetailsRequest",
    });

    const { data } = await axios.get(
     ` /api/v1/product/${id}`
     
    );
console.log(data)
    dispatch({
      type: "getProductDetailsSuccess",
      payload: data.product
      ,
    });
  } catch (error) {
    dispatch({
      type: "getProductDetailsFailure",
      payload: error.response.data.message,
    });
  }
};
export const CreateReview = (productId, rating, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateReviewRequest",
    });

    const { data } = await axios.put(
      `/api/v1/review`, 
      { 
        productId,  // Ensure productId is not wrapped inside an object
        rating,
        comment
      }
    );

    console.log(data);

    dispatch({
      type: "CreateReviewSuccess",
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: "CreateReviewFailure",
      payload: error.response.data.message,
    });
  }
};
export const getProductAllReview = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getProductAllReviewRequest",
    });

    const { data } = await axios.get(
      `/api/v1/reviews/${id}`
     
    );

    console.log(data);

    dispatch({
      type: "getProductAllReviewSuccess",
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: "getProductAllReviewFailure",
      payload: error.response.data.message,
    });
  }
};

