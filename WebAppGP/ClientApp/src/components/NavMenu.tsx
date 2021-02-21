import * as React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export default class NavMenu extends React.PureComponent<{}> {

    public render() {
        return (
            <header>
                <Navbar collapseOnSelect expand="md" variant="dark" style={{background: '#414770'}}>
                    <Container>
                        <Link to="/learning-react">
                            <img style={{marginRight: '10px'}} className="responsive" src="https://res.cloudinary.com/drsrpeh2f/image/upload/v1613872332/logo_s1xvmm.png" width="80px"/>
                        </Link>
                        <Navbar.Brand className="logoText" as={Link} to="/learning-react" style={{fontSize: '1.5rem', color: "#F46036", textShadow: "-1px 1px 0px #873A24"}}>99STRENGTH</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                            <Nav>
                                <Nav.Item>
                                    <Nav.Link className="text-light" as={Link} to="/">Home</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="text-light" as={Link} to="/learning-react">Learning React</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header >
        );
    }
}
