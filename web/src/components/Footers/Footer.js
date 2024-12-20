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
/*eslint-disable*/

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              href="https://www.creative-tim.com?ref=adr-admin-footer"
              rel="noopener noreferrer"
              target="_blank"
            >
              Prince NIYONSHUTI
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink
                href="https://www.rdb.rw"
                rel="noopener noreferrer"
                target="_blank"
              >
                RDB
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://www.rema.gov.rw"
                rel="noopener noreferrer"
                target="_blank"
              >
                Rema
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="http://www.visitrwanda.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Visit Rwanda
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href=""
                rel="noopener noreferrer"
                target="_blank"
              >
                All rights reserved
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
