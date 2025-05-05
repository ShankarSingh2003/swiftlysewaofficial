import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>Login</h1>
      <SignIn path="/login" routing="path" signUpUrl="/signup" forceRedirectUrl={"/"} />
    </div>
  );
};

export default Login;
