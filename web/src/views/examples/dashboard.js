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

// reactstrap components
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InformationModal from "./informationModal";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/LandingPageHeader";
import Navbar from "components/Navbars/Navbar.js";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <UserHeader/>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mt-5 mb-5 mb-xl-0" xl="4">
          </Col>
          <Col className="order-xl-1" xl="10">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Dashboard</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6" >
                      <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Add visitors
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                add new visitor by simply tapping the button below
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                <i className="fas fa-chart-bar" />
                              </div>
                            </Col>
                          </Row>
                          <Button
                            color="success"
                            onClick={(e) => navigate("/addvisitor")}
                            size="sm"
                          >
                            Add a visitor
                          </Button>
                        </CardBody>
                      </Card>

                    </Col>
                    <Col lg="6" >
                      
                      <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                visitation history
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                view all past visits at Umusambi village
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                <i className="air-ballon" />
                              </div>
                            </Col>
                          </Row>
                          <Button
                            color="success"
                            onClick={(e) => navigate("/addvisitor")}
                            size="sm"
                          >
                            history
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
                <hr className="my-4" />
                {/* Address */}
                <h6 className="heading-small text-muted mb-4"/>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6" >
                      <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                view visitors
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                all visitors registered in the system
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                <i className="fas fa-chart-bar" />
                              </div>
                            </Col>
                          </Row>
                          <Button
                            color="secondary"
                            onClick={(e) => navigate("/addvisitor")}
                            size="sm"
                          >
                             all visitors
                          </Button>
                        </CardBody>
                      </Card>

                    </Col>

                    <Col lg="6" >
                      <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Add a newvisit to the system
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                              Add a newvisit to the system
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                <i className="fas fa-chart-bar" />
                              </div>
                            </Col>
                          </Row>
                          <Button
                            color="secondary"
                            onClick={(e) => navigate("/addvisitor")}
                            size="sm"
                          >
                            Book a visit
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      </>
  );
};

export default Dashboard;
