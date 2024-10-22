/*eslint-disable*/
import React from "react";
import { useNavigate } from "react-router-dom";

// reactstrap components
import { Container,Button } from "reactstrap";
import "assets/css/carousel.css"
import LandingPage2 from "./LandingPage2";
import Footer from "components/Footers/Footer";
import LandingNavbar from "components/Navbars/LandinNavbar";
// core components

function IndexHeader() {
  let pageHeader = React.createRef();
  const navigate=useNavigate();
  return (
    <>
    <LandingNavbar/>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/entrance.jpeg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center" style={{marginTop:"200px"}}>
            <img
              alt="..."
              className="n-logo"
              src={require("assets/img/UmusambiLogo.jpg")}
            ></img>
            <h1 style={{color:"white"}}>Umusambi village.</h1>
            <h3 style={{color:"white"}}>A beautiful adventerous place for you.</h3>
            <Button
                      color="success"
                      onClick={(e) => navigate("/login")}
                      size="lg"
                    >
                      Login in the system
                    </Button>
          </div>
        </Container>
      </div>
      <LandingPage2/>
      <Footer/>
    </>
  );
}

export default IndexHeader;
