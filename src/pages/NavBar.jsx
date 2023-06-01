import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const expand = "sm";
  const token = localStorage.getItem("token");

  if (!token) return;

  return (
    <Navbar bg="light" expand={expand} className="mb-3">
      <Container fluid>
        <NavLink
          to="/"
          className={({ isActive, isPending }) => {
            const conditionalClass = isPending
              ? "pending"
              : isActive
              ? "active"
              : "";
            return `nav-link ${conditionalClass}`;
          }}
        >
          Innoscripta Frontend
        </NavLink>

        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Innoscripta Frontend
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavLink
                to="/preferences"
                className={({ isActive, isPending }) => {
                  const conditionalClass = isPending
                    ? "pending"
                    : isActive
                    ? "active"
                    : "";
                  return `nav-link ${conditionalClass}`;
                }}
              >
                Preferences
              </NavLink>
              <NavLink
                to="/articles"
                className={({ isActive, isPending }) => {
                  const conditionalClass = isPending
                    ? "pending"
                    : isActive
                    ? "active"
                    : "";
                  return `nav-link ${conditionalClass}`;
                }}
              >
                Articles
              </NavLink>
              <NavLink
                className="nav-link text-danger"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload("/");
                }}
              >
                Logout
              </NavLink>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
