import * as React from "react";
import { Form, Button } from "react-bootstrap";
import { Register } from "../services/user";

export const RegisterBox = (props: any) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegisterSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    Register(email, password, username);

    console.log(username + " " + email);
  };

  return (
    //If button is pressed, this component is not rendered, but LoginBox is
    // rendered instead
    <div id="registerBox">
      <Button onClick={() => props.setRegisterForm(false)}>
        We going back boys
      </Button>

      <Form
        style={{ margin: "0.5rem 0 1rem 0" }}
        className="text-center"
        onSubmit={handleRegisterSubmit}
      >
        <Form.Group controlId="username" className="text-left">
          <Form.Label style={{ margin: "1rem 0 0 0" }}>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="text-left">
          <Form.Label style={{ margin: "1rem 0 0 0" }}>
            Email address
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="text-left">
          <Form.Label style={{ margin: "1rem 0 0 0" }}>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
          />
        </Form.Group>

        <Button style={{ marginTop: "1rem" }} type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};
