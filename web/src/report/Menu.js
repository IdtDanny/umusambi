import { useState } from "react";
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  Col,
} from "reactstrap";
import classnames from "classnames";
import PaymentDatesReport from "./PaymentDateReport";
import VisitedDateReport from "./VisitorDateReport";

const ReportMenu = () => {
  const [activeTab, setActiveTab] = useState(1);

  const toggleTab = (tabIndex) => {
    if (activeTab !== tabIndex) {
      setActiveTab(tabIndex);
    }
  };

  return (
    <Col>
      {/* Menu */}
      <div className="mb-3">
        <small className="text-uppercase font-weight-bold">choose Report</small>
      </div>
      <div className="nav-wrapper">
        <Nav
          className="nav-fill flex-column flex-md-row"
          id="tabs-icons-text"
          pills
          role="tablist"
        >
          <NavItem>
            <NavLink
              aria-selected={activeTab === 1}
              className={classnames("mb-sm-3 mb-md-0", {
                active: activeTab === 1,
              })}
              onClick={() => toggleTab(1)}
              role="tab"
            >
              Periodic visit report
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              aria-selected={activeTab === 2}
              className={classnames("mb-sm-3 mb-md-0", {
                active: activeTab === 2,
              })}
              onClick={() => toggleTab(2)}
              role="tab"
            >
              visitor payment report
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <Card className="shadow">
        <CardBody>
          {activeTab === 1 && (
            <TabPane>
              <PaymentDatesReport />
            </TabPane>
          )}
          {activeTab === 2 && (
            <TabPane>
              <VisitedDateReport />
            </TabPane>
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default ReportMenu;
