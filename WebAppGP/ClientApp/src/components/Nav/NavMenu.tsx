import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApplicationState } from "../../store";
import { UserState } from "../../store/UserReducer";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../../services/authentication";
import "./NavMenu.css";

export const NavMenu = () => {
  const dispatch = useDispatch();

  return (
    <header style={{ margin: "0px" }}>
      <Navbar collapseOnSelect expand={true} variant="light" id="navbar">
        <Container>
          <Navbar.Brand
            className="logoText"
            as={Link}
            to="/main"
            style={{
              padding: "0px",
              fontSize: "1.4rem",
              color: "#F46036",
              textShadow: "-1px 1px 0px #873A24",
            }}
          >
            99STRENGTH
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Item>
                <Nav.Link className="text-dark" as={Link} to="/main">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-dark" as={Link} to="/settings">
                  Settings
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    Logout(dispatch);
                  }}
                  className="text-dark"
                >
                  <span>Log out</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavMenu;
