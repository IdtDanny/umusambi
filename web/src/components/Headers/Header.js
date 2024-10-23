
// reactstrap components
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col, Button } from "reactstrap";
import GeneralReport from "report/generateReport";
const Header = () => {
  const [users, setUser] = useState({});
  const [showReport, setShowReport] = useState(false)
  const [weeklyVisits, setWeeklyVisits] = useState({});
  const [dailyVisits, setDailyVisits] = useState({});
  const toggleShowReport = () => {
    setShowReport(!showReport);
  };
  useEffect(() => {
    const fetchData = async () => {
      const urls = ["http://localhost:7000/api/admin/weeklyvisit",
        "http://localhost:7000/api/admin/dailyvisit",
        "http://localhost:7000/api/admin/weeklyuser"]
      const requestOptions = {
        method: 'GET',
        headers: {
          'content-Type': 'application/json',
          'x-auth-token': JSON.parse(localStorage.getItem("token"))
        }
      }
      const requests = urls.map((url) => fetch(url, requestOptions));
      const responses = await Promise.all(requests)
      const data = await Promise.all(responses.map(response => response.json()));  
      setWeeklyVisits(data[0]);
      setDailyVisits(data[1]);
      setUser(data[2]);
    }
    fetchData();

  }, [])

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Generate Report
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {dailyVisits.TodayCount}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <Button color="success" onClick={toggleShowReport}>
                      Report panel
                    </Button>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {/* New Users */}
                          New Visitors
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{users.currentWeekCount}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {users.percentage < 0 && (
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" /> {users.percentage}</span>)}
                      {users.percentage >= 0 && (
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> {users.percentage}</span>)}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          weekly visits
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{weeklyVisits.currentWeekCount}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {weeklyVisits.percentage < 0 && (
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" /> {weeklyVisits.percentage}</span>)}
                      {weeklyVisits.percentage >= 0 && (
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> {weeklyVisits.percentage}</span>)}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h6"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total number of visitors
                        </CardTitle>
                        <span className="h5 font-weight-bold mb-0">{dailyVisits.visitorCount}</span><span className="text-sm"> visitors</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted">
                      <span className="text-success mr-2">
                        <span style={{ color: 'black',fontSize:"14px" }}>TOTAL NUMBER OF VISITS</span> {dailyVisits.historyCount}
                      </span>{"visits"}
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
        <div>
          <GeneralReport setShowModal={setShowReport} toggleModal={toggleShowReport} modalState={showReport} />
        </div>
      </div>
    </>
  );
};

export default Header;
