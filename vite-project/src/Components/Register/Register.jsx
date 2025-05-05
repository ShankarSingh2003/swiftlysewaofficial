import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "../../ValidatorSchema/ValidatorSchema";
import { registerUser } from "../../action/User";
import "./Register.css";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  
  const { loading, error } = useSelector((state) => state.user);

  // Initialize useForm with validation schema
  const {
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  // Form submission handler
  const submitHandler = (data) => {
  
    console.log('form submitted',data)
     const { name, email, password, confirmPassword, phone } = data;
     console.log(name,email)
     dispatch(registerUser(name, email, password, confirmPassword, phone));
  };

  useEffect(() => {
    if (error) {
    toast.error(`${error}`)
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error]);

  return (
    <div className="register">
      <form className="registerForm" onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label htmlFor="name">Name</label>
          {errors?.name && <span>{errors.name.message}</span>}
          <input type="text" {...register("name")}  className="registerInputs"/>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          {errors?.email && <span>{errors.email.message}</span>}
          <input type="email" {...register("email")} className="registerInputs" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          {errors?.password && <span>{errors.password.message}</span>}
          <input type="password" {...register("password")}  className="registerInputs" />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          {errors?.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
          <input type="password" {...register("confirmPassword")}  className="registerInputs"/>
        </div>

        <div>
          <label htmlFor="phone">Phone Number</label>
          {errors?.phone && <span>{errors.phone.message}</span>}
          <input type="text" {...register("phone")}  className="registerInputs" />
        </div>

        {/* <Link to="/login">Already Signed Up? Login Now</Link> */}
        <button type="submit" disabled={loading} className="button">
 Register
      </button>
      </form>
    </div>
  );
};

export default Register;

