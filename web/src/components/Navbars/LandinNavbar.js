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

const LandingNavbar = () => {
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    navigate("/")
  }
  return (
    <>
      <div className="bg-gradient-info" >
        <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md" style={{height:'60px'}}>
          <Container className="px-4">
            <NavbarBrand to="/" tag={Link} style={{marginTop:'20px'}}>
              <h5 style={{color:"whitesmoke"}}>Umusambi village</h5>
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
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
                  <NavLink
                    className="nav-link-icon"
                    to="/booking"
                    tag={Link}
                  >
                    <i className="ni ni-single-02" />
                    <span className="nav-link-inner--text">About us</span>
                  </NavLink>
                </NavItem>
                <NavItem className="pt-3">
                <Button
                      color="primary"
                      onClick={logout}
                      size="sm"
                    >
                      Authentication
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

export default LandingNavbar;
