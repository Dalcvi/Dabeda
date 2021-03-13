import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApplicationState } from "../../store/Index";
import { UserState } from "../../store/User";
import { useSelector } from "react-redux";
import "./NavMenu.css";

export const NavMenu = () => {
  const username = useSelector<ApplicationState, UserState["username"]>(
    (state) => state.user.username
  );

  return (
    <header style={{ margin: "0px" }}>
      <Navbar
        collapseOnSelect
        expand={false}
        variant="dark"
        style={{ background: "#414770" }}
      >
        <Container>
          <Link to={`/user/${username}`}>
            <img
              className="img-fluid"
              src="https://res.cloudinary.com/drsrpeh2f/image/upload/v1613872332/logo_s1xvmm.png"
              alt="Logo"
              width="90em"
            />
          </Link>
          <Navbar.Brand
            className="logoText"
            as={Link}
            to={"/user/" + username}
            style={{
              fontSize: "1.5rem",
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
                <Nav.Link
                  className="text-light"
                  as={Link}
                  to={"/user/" + username}
                >
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="text-light"
                  as={Link}
                  to={`/user/${username}`}
                >
                  Learning React
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
