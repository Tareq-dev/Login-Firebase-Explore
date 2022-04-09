import { getAuth } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import app from '../../firebase.init';

const auth = getAuth(app);
const Products = () => {
     const [user] = useAuthState(auth)
     return (
          <div className="App">
              <h3>From Products Page</h3> 
              <p>{user ? user.displayName : 'No Body'} is Want to buy</p>
          </div>
     );
};

export default Products;