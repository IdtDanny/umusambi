/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Link, useNavigate } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

const AdminNavbar = () => {
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    navigate("/")
  }
  return (
    <>
      <div className="bg-gradient-info">
        <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
          <Container className="px-4">
            <NavbarBrand to="/booking" tag={Link}>
              <h4 style={{color:"whitesmoke",}}>Umusambi village</h4>
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/booking">
                    <h4 style={{color:"Black",}}>Umusambi village</h4>
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar-collapse-main">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className="nav-link-icon" to="/booking" tag={Link}>
                    <i className="ni ni-planet" />
                    <span className="nav-link-inner--text">Dashboard</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/visitors"
                    tag={Link}
                  >
                    <i className="ni ni-circle-08" />
                    <span className="nav-link-inner--text">visitors</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link-icon" to="/history" tag={Link}>
                    <i className="ni ni-key-25" />
                    <span className="nav-link-inner--text">Visitation history</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/booking"
                    tag={Link}
                  >
                    <i className="ni ni-single-02" />
                    <span className="nav-link-inner--text">Book a visit</span>
                  </NavLink>
                </NavItem>
                <NavItem className="pt-2">
                <Button
                      color="primary"
                      onClick={logout}
                      size="sm"
                      
                    >
                      logout
                    </Button>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default AdminNavbar;
