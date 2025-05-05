import { SignUp } from "@clerk/clerk-react";

const Signup = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>Sign Up</h1>
      <SignUp path="/signup" routing="path" signInUrl="/login"  forceRedirectUrl={"/"} />
    </div>
  );
};

export default Signup;
