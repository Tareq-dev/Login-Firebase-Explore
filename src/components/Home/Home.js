import { getAuth } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../firebase.init";

const auth = getAuth(app);
const Home = () => {
  const [user] = useAuthState(auth)
  return (
    <div className="App">
      <h2>I am from Home</h2>
      <p>Current User is : {user? user.displayName : 'No Body'}</p>
    </div>
  );
};

export default Home;
