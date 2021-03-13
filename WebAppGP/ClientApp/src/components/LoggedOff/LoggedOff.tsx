import { useState } from "react";
import * as RB from "react-bootstrap";
import { LoginBox } from "./SignIn";
import { RegisterBox } from "./SignUp";

import "../../custom.css";

const LoggedOff = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <RB.Container fluid>
      <RB.Row id="loginRow" className="d-flex align-items-center">
        <RB.Col lg={7} className="d-flex flex-column align-items-center">
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
        </RB.Col>
        <RB.Col
          lg={5}
          className="d-flex justify-content-lg-start justify-content-center
"
        >
          {!isRegistering ? (
            // THIS IS RENDERED AS DEFAULT OR WHEN COMING BACK FROM REGISTER FORM
            <LoginBox setIsRegistering={setIsRegistering} />
          ) : (
            // IF REGISTER BUTTON PRESSED, REGISTER SCREEN WILL BE RENDERED INSTEAD
            <RegisterBox setIsRegistering={setIsRegistering} />
          )}
        </RB.Col>
      </RB.Row>
    </RB.Container>
  );
};

export default LoggedOff;
