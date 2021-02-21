import * as React from 'react';
import * as RB from 'react-bootstrap';
import { Redirect } from 'react-router';

import '../custom.css';


const Home = () => { 
  const [validated, setValidated] = React.useState(false);
  
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  if(validated) {
    return <Redirect to="/learning-react" />
  }

  return( 
  <RB.Container fluid>
    <RB.Row id="loginRow" className="d-flex align-items-center">
      <RB.Col lg={7} className="d-flex flex-column align-items-center">
        <img className="responsive" src="https://res.cloudinary.com/drsrpeh2f/image/upload/v1613872332/logo_s1xvmm.png" />
        <h1 className="logoText" style={{fontSize: '7rem', color: "#F46036", textShadow: "-3px 3px 0px #873A24"}}>99STRENGTH</h1>
        <p style={{fontSize: '2.5rem', color: "#262940"}}>For more than achieving</p>
      </RB.Col>

      <RB.Col lg={5} className="d-flex justify-content-start">
        <div id="loginBox">
        <RB.Form onSubmit={handleSubmit} className="text-center">

          <RB.Form.Group controlId="formBasicEmail">
            <RB.Form.Control type="email" placeholder="Enter email" required />
            <RB.Form.Control.Feedback type="invalid">
              Please enter your email address.
            </RB.Form.Control.Feedback>
          </RB.Form.Group>

          <RB.Form.Group controlId="formBasicPassword">
            <RB.Form.Control type="password" placeholder="Password" required />
            <RB.Form.Control.Feedback type="invalid">
            Please enter your password.
            </RB.Form.Control.Feedback>
          </RB.Form.Group>

          <RB.Button variant="primary" type="submit">
            Login
          </RB.Button>
        </RB.Form>
          <hr /> 
        </div>
      </RB.Col>
    </RB.Row>
  </RB.Container>
);
};

export default (Home);
