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
import { useState } from "react";
import FindVisitor from "./findvisitor";
import Visitordetails from "./visitorDetails";
import Footer from "components/Footers/Footer.js";
import Navbar from "components/Navbars/Navbar.js";
import Book from "./book";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Button,
  Col,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Booking = () => {
  const [data, setData] = useState([])
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(2)
  }
  const reset = () => {
    setStep(1);
  }
  const gotobook = () => {
    setStep(3)
  }
  return (
    <>
    <Navbar/>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <Row>
                <Col xl="8" >
                  <Card className="shadow">
                    <CardHeader className="bg-transparent">
                      <Row className="align-items-center">
                        <div className="col">
                          <h6 className="text-uppercase text-muted ls-1 mb-1">
                            Book for a visitor
                          </h6>
                          {step === 1 && (<h3 className="mb-0">Fill the form below</h3>)}
                          {step === 2 && (<h3 className="mb-0">Double check if the information matches</h3>)}
                        </div>
                        <div className="col">
                          <div className="d-flex justify-content-end" >
                          {step === 2 && (<Button
                            color="info"
                            onClick={() => reset()}
                          >
                            Go back
                          </Button>)}
                          {step === 3 && (<Button
                            color="info"
                            onClick={() => reset()}
                          >
                            Restart the process
                          </Button>)}
                          </div>
                        </div>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      {step === 1 && (<FindVisitor setVisitordata={setData} onNext={handleNext} setStep={setStep} />)}
                      {step === 2 && (<Visitordetails data={data}  proceed={gotobook} />)}
                      {step===3 && (<Book data={data} reset={reset} />)}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Card>
          </div>
        </Row>
        <Footer/>
      </Container>
    </>
  );
};

export default Booking;
