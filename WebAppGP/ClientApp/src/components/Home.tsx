import React from "react";
import * as RB from "react-bootstrap";
import { LoginBox } from "./LoginBox";
import { RegisterBox } from "./RegisterBox";

import "../custom.css";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Home = () => {
  const [registerForm, setRegisterForm] = React.useState(false);

  return (
    <RB.Container fluid>
      <RB.Row id="loginRow" className="d-flex align-items-center">
        <RB.Col lg={7} className="d-flex flex-column align-items-center">
          <img
            className="responsive"
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
          {!registerForm ? (
            // THIS IS RENDERED AS DEFAULT OR WHEN COMING BACK FROM REGISTER FORM
            <LoginBox setRegisterForm={setRegisterForm} />
          ) : (
            // IF REGISTER BUTTON PRESSED, REGISTER SCREEN WILL BE RENDERED INSTEAD
            <RegisterBox setRegisterForm={setRegisterForm} />
          )}
        </RB.Col>
      </RB.Row>
    </RB.Container>
  );
};

export default Home;
