import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { Login } from "../../services/user";
import * as React from "react";

export const LoginBox = (props: any) => {
  const [loggedIn, setloggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();

  // If login is successful, sets validated to true and redirects to users page
  // P.S. this has to change later
  const handleLoginSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setloggedIn(true);
    // Login(dispatch, email, password).then((isLoggedIn) => {
    //   if (isLoggedIn) {
    //     setloggedIn(true);
    //   }
    // });
  };

  if (loggedIn) {
    return <Redirect to="/user/fakeuser" />;
  }

  return (
    <div id="loginBox">
      <Form onSubmit={handleLoginSubmit} className="text-center">
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your email address.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" style={{ width: "100%" }}>
          Login
        </Button>
      </Form>
      <div
        style={{ marginTop: "1rem" }}
        className="d-flex justify-content-center"
      >
        <a href="#" className="text-primary">
          Forgot Password?
        </a>
      </div>
      <hr style={{ marginTop: "1rem" }} />
      <div
        style={{ marginBottom: "0.5rem" }}
        className="d-flex justify-content-center"
      >
        <Button
          variant="secondary"
          style={{ width: "6rem" }}
          onClick={() => props.setIsRegistering(true)}
        >
          Register
        </Button>
      </div>
    </div>
  );
};
