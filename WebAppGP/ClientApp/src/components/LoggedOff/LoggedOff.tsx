import { useState } from "react";
import { Row, Col, Toast, Container } from "react-bootstrap";
import { LoginBox } from "./SignIn";
import { RegisterBox } from "./SignUp";

import "../../custom.css";

const LoggedOff = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [show, setShow] = useState({show: false, text: "", color: ""});

  return (
    <Container fluid>
      <ServerOffNotification show={show} setShow={setShow} />
      <Row id="loginRow" className="d-flex align-items-center">
        <Col lg={7} className="d-flex flex-column align-items-center">
          <img
            className="img-fluid"
            src="https://res.cloudinary.com/drsrpeh2f/image/upload/v1613872332/logo_s1xvmm.png"
            alt="Logo"
          />
          <h1
            className="logoText"
            style={{
              fontSize: "7rem",
              color: "#F46036",
              textShadow: "-3px 3px 0px #873A24",
            }}
          >
            99STRENGTH
          </h1>
          <p
            style={{ fontSize: "2.5rem", color: "#262940" }}
            className="d-none d-md-inline"
          >
            For more than achieving
          </p>
        </Col>
        <Col
          lg={5}
          className="d-flex justify-content-lg-start justify-content-center
"
        >
          {!isRegistering ? (
            // THIS IS RENDERED AS DEFAULT OR WHEN COMING BACK FROM REGISTER FORM
            <LoginBox setIsRegistering={setIsRegistering} setShow={setShow} />
          ) : (
            // IF REGISTER BUTTON PRESSED, REGISTER SCREEN WILL BE RENDERED INSTEAD
            <RegisterBox setIsRegistering={setIsRegistering} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoggedOff;

function ServerOffNotification(props: any) {
  return (
    <Toast
      onClose={() => props.setShow({show: false, text: "", color: ""})}
      show={props.show.show}
      delay={3000}
      autohide
      style={{
        position: "fixed",
        right: "1vw",
        top: "1vh",
        background: props.show.color,
      }}
    >
      <Toast.Body>{props.show.text}</Toast.Body>
    </Toast>
  );
}
