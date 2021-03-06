import React from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";
import { useState } from "react";
import Form from "./Form";
import app from "../firebase.init";

const SignwithOthers = () => {
  const [user, setUser] = useState([]);

  const auth = getAuth(app);
  const Goolgeprovider = new GoogleAuthProvider();
  const Githubprovider = new GithubAuthProvider();

  const googleSignIn = () => {
    signInWithPopup(auth, Goolgeprovider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
      });
  };

  const githubSignIn = () => {
    signInWithPopup(auth, Githubprovider)
      .then((res) => {
        const user = res.user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="App">
        <h3>let's build user authentication</h3>
        <div className="mb-5 mt-5">
          <h1>{user.displayName && user.displayName}</h1>
        </div>

        {user.uid ? (
          <button onClick={googleSignOut}> Sign Out</button>
        ) : (
          <>
            <button onClick={googleSignIn}>Google Sign In</button>
            <button className="mx-5" onClick={githubSignIn}>
              Github Sign In
            </button>
          </>
        )}
        <br />
        <h3>{user.displayName}</h3>
        <img src={user.photoURL} alt="" />
      </div>
      <div>{user.uid ? "" : <Form />}</div>
    </div>
  );
};

export default SignwithOthers;
