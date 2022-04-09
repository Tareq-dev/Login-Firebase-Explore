import { getAuth } from "firebase/auth";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import app from "./../../firebase.init";

const auth = getAuth(app);
const Login = () => {
  const [SignInWithGoogle, user] = useSignInWithGoogle(auth);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.from?.pathname || "/";

  const handleSignInWithGoogle = () => {
    SignInWithGoogle().then(() => {
      navigate(from, { replace: true });
    });
  };
  return (
    <div className="d-flex justify-content-center">
      <div>
        <h2>{user?.uid ? "Welcome Here" : "Please Login"}</h2>
        <div className="d-flex justify-content-center mt-3">
          <button onClick={handleSignInWithGoogle}>Google Sign In</button>
        </div>
        <br />
        <input
          className="mt-4"
          type="email"
          name=""
          id=""
          placeholder="Your email"
        />
        <br />
        <input type="password" name="" id="" placeholder="Your Password" />
        <br />
        <div className="d-flex justify-content-center">
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
