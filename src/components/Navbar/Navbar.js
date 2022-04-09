import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import app from "../../firebase.init";

const auth = getAuth(app);
const Navbar = () => {
     const [user] = useAuthState(auth);
  return (
    <div className="mt-5 pt-3 d-flex justify-content-center fs-5 fw-bold">
      <div className="d-flex list-unstyled mx-5">
          <Link className="mx-3 text-decoration-none" to="/">Home</Link>
          <Link className="mx-3 text-decoration-none" to="/products">Products</Link>
          <Link className="mx-3 text-decoration-none" to="orders">Orders</Link>
          <Link className="mx-3 text-decoration-none" to="/register">Register</Link>
          {
               user && 
               <Link className="mx-3 text-decoration-none text-success" to="/vip">Vip</Link>

          }
        <img style={{ width:"35px", borderRadius:"50%"}}src={user?.photoURL ? user.photoURL : ''} alt="" />
        <span className="mx-1">{user?.displayName && user.displayName}</span>
        {user?.uid ? 
          <button onClick={() => signOut(auth)}>Sign Out</button> 
          :
          <Link to="/login">Login</Link>
     }
      </div>
    </div>
  );
};

export default Navbar;
