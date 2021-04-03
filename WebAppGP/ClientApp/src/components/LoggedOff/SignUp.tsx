import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { SignUp } from "../../services/authentication";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export const RegisterBox = (props: any) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confEmail, setConfEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [notMatchingEmail, setNotMatchingEmail] = useState(false);
  const [notMatchingPassword, setNotMatchingPassword] = useState(false);
  const [strongPassword, setStrongPassword] = useState(true);

  const dispatch = useDispatch();

  const handleRegisterSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (!notMatchingEmail && !notMatchingPassword && strongPassword)
      SignUp(dispatch, { email, password, username });
  };

  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      checkIfEmailMatches();
    }, 1500);
    return () => clearTimeout(delayDebounceFn);
  }, [email]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      checkIfEmailMatches();
    }, 1500);
    return () => clearTimeout(delayDebounceFn);
  }, [confEmail]);

  const checkIfEmailMatches = () => {
    if (confEmail == "" || email == "") {
      setNotMatchingEmail(false);
    } else {
      if (confEmail != email) setNotMatchingEmail(true);
      else setNotMatchingEmail(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      checkIfStrongPassword();
      checkIfPasswordMatches();
    }, 1500);
    return () => clearTimeout(delayDebounceFn);
  }, [password]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      checkIfPasswordMatches();
    }, 1500);
    return () => clearTimeout(delayDebounceFn);
  }, [confPassword]);

  const checkIfPasswordMatches = () => {
    if (confPassword == "" || password == "") {
      setNotMatchingPassword(false);
    } else {
      if (confPassword != password) setNotMatchingPassword(true);
      else setNotMatchingPassword(false);
    }
  };

  const checkIfStrongPassword = () => {
    if (password == "" || passwordRegex.test(password)) {
      setStrongPassword(true);
    } else {
      setStrongPassword(false);
    }
  };

  return (
    // If button is pressed, this component is not rendered, but LoginBox is
    // rendered instead
    <div id="registerBox">
      <FontAwesomeIcon
        id="left-arrow"
        className="arrow"
        icon={faChevronLeft}
        size="2x"
        onClick={() => props.setIsRegistering(false)}
      />
      <Form
        style={{ margin: "0.5rem 0 1rem 0" }}
        className="text-center"
        onSubmit={handleRegisterSubmit}
      >
        <Form.Group controlId="username" className="text-left">
          <Form.Control
            autoComplete="off"
            type="text"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="text-left">
          <Form.Control
            autoComplete="off"
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            isInvalid={notMatchingEmail}
            required
          />
        </Form.Group>

        <Form.Group controlId="confEmail" className="text-left">
          <Form.Control
            autoComplete="new-password"
            type="text"
            name="confEmail"
            value={confEmail}
            onChange={(event) => setConfEmail(event.target.value)}
            placeholder="Confirm email"
            isInvalid={notMatchingEmail}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email doesnt match
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password" className="text-left">
          <Form.Control
            autoComplete="off"
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            isInvalid={notMatchingPassword || !strongPassword}
            required
          />
          <Form.Control.Feedback type="invalid">
            {!strongPassword &&
              `Password must contain at least 8 characters, with one uppercase letter,
            one lowercase letter and one number`}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="confPassword" className="text-left">
          <Form.Control
            autoComplete="new-password"
            type="password"
            name="confPassword"
            value={confPassword}
            onChange={(event) => setConfPassword(event.target.value)}
            placeholder="Confirm password"
            isInvalid={notMatchingPassword}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password doesn't match
          </Form.Control.Feedback>
        </Form.Group>
        <Button style={{ marginTop: "1rem" }} type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};
