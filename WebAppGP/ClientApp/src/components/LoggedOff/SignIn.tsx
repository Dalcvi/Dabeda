import { Form, Button, Row, Col, Toast } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { SignIn } from "../../services/authentication";
import * as React from "react";

export const LoginBox = (props: any) => {
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
    } else {
      !SignIn(dispatch, { email, password }).then((answer) => {
        const text =
          answer === 401
            ? "Wrong log in info"
            : answer === 500
            ? "Server offline"
            : "";
        const color =
          answer === 401 ? "#ffa500" : answer === 500 ? "#dc143c" : "";
        const show = answer > 300 ? true : false;
        if (show) {
          props.setShow({ show: show, text: text, color: color });
        }
      });
    }
  };

  const enterPress = (event: any) => {
    if (event.target.charCode === 13) event.target.click();
  };

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

        <Button
          variant="primary"
          type="submit"
          onKeyPress={(e) => enterPress(e)}
          style={{ width: "100%" }}
        >
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
