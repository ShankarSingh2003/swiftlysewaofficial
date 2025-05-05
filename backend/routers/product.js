const express = require("express");


const { isAuthenicatedUser, authorizeRoles } = require("../utils/middleware");

const {createProduct, getAllProducts, getAdminProducts, getProductDetails, createProductReview, getProductReviews}=require("../controller/productcontroller");
const { bookproduct } = require("../controller/ordercontroller");

const router = express.Router();

 router.route("/products").get(getAllProducts);

 router
   .route("/admin/products")
   .get(isAuthenicatedUser, getAdminProducts);

 router
  .route("/admin/product/new")
   .post(isAuthenicatedUser,authorizeRoles('admin'), createProduct);

// router
//   .route("/admin/product/:id")
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

 router.route("/product/:id").get( isAuthenicatedUser, getProductDetails);

 router.route("/review/").put(isAuthenicatedUser, createProductReview);

router
   .route("/reviews/:id")
  .get(getProductReviews)
//   .delete(isAuthenticatedUser, deleteReview);
router.route("/bookproduct").get(isAuthenicatedUser,bookproduct)

module.exports = router;