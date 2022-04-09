import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import app from "../firebase.init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  // Name

  const handleNameBlur = (event) => {
    setName(event);
  };

  // Email
  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };

  //Password
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };

  // Registered Checked
  const handleRegistered = (event) => {
    setRegistered(event.target.checked);
  };

  //set user name
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };
  // verify email
  const verifyEmail = (event) => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("email verification sent");
      })
      .then(() => {
        // Email verification sent!
        // ...
      });
  };
  // handle Password Reset
  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      console.log("email sent");
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // form validation rule
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    // password charecter check
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError("Password should contain at least one special character");
      return;
    }

    setValidated(true);
    setError("");

    // passwording validation checked
    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setEmail("");
          setPassword("");
          verifyEmail();
          setUserName();
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    }
    event.preventDefault();
  };
  return (
    <div>
      <h2 className="text-center">
        Please {registered ? "Login" : "Register"}
      </h2>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="w-50 mx-auto border p-5"
      >
        {!registered && (
          <Form.Group className="mb-3" controlId="formBasicnamw">
            <Form.Label> Name</Form.Label>
            <Form.Control
              onBlur={handleNameBlur}
              type="name"
              placeholder="Enter Name"
              required
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onBlur={handleEmailBlur}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onBlur={handlePasswordBlur}
            type="password"
            placeholder="Password"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            onChange={handleRegistered}
            type="checkbox"
            label="Allready Registered?"
          />
        </Form.Group>
        <p className="text-danger">{error}</p>
        <Button onClick={handlePasswordReset} variant="link">
          Forget Password ?
        </Button>
        <br />
        <Button variant="primary" type="submit">
          {registered ? "Login" : "Register"}
        </Button>
      </Form>
    </div>
  );
};
export default Register;
