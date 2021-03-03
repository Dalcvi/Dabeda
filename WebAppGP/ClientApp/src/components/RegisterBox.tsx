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
    console.log(username + " kisasi " + email);
  };

  return (
    <div id="registerBox">
      <Button onClick={() => props.setRegisterForm(false)}>
        We going back boys
      </Button>

      <Form
        style={{ margin: "0.5rem 0 1rem 0" }}
        className="text-center"
        onSubmit={handleRegisterSubmit}
      >
        <Form.Group
          style={{ margin: "1rem 0 0 0" }}
          className="text-left"
          controlId="username"
        >
          Username
        </Form.Group>
        <Form.Control
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          required
        />
        <Form.Group
          style={{ margin: "1rem 0 0 0" }}
          className="text-left"
          controlId="email"
        >
          Email
        </Form.Group>
        <Form.Control
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
        />
        <Form.Group
          style={{ margin: "1rem 0 0 0" }}
          className="text-left"
          controlId="password"
        >
          Password
        </Form.Group>
        <Form.Control
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
        <Button style={{ marginTop: "1rem" }} type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};
