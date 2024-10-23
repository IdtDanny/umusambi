import { useState } from "react";
import GenerateVisitorPaymentPDF from "./PdfPaymentReport";
import {
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row,
  Button,
} from "reactstrap";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const PaymentDatesReport = () => {
  const [data, setData] = useState({
    startDate: "",
    endDate: "",
  });
  const handleRequestData = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/admin/paymentStats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': JSON.parse(localStorage.getItem("token"))
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      toast.success("successfull downloaded report", {
        position: "top-left"
      });
      GenerateVisitorPaymentPDF(responseData.visitors,responseData.totalPayments)
    } catch (error) {
      toast.success("unable to download report", {
        position: "top-left"
      });
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <h3 className="mb-3 text-success text-muted">Payment report</h3>
      </div>
      <Row>
        <Col>
          <small className="d-block text-uppercase font-weight-bold mb-3">
            Start Date
          </small>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-calendar-grid-58" />
                </InputGroupText>
              </InputGroupAddon>
              <input
                type="date"
                className="form-control"
                placeholder="Date Picker Here"
                value={data.startDate}
                onChange={(e) =>
                  setData({ ...data, startDate: e.target.value })
                }
              />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col>
          <small className="d-block text-uppercase font-weight-bold mb-3">
            End date
          </small>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-calendar-grid-58" />
                </InputGroupText>
              </InputGroupAddon>
              <input
                type="date"
                className="form-control"
                placeholder="Date Picker Here"
                value={data.endDate}
                onChange={(e) =>
                  setData({ ...data, endDate: e.target.value })
                }
                min={data.startDate} // Set the minimum date based on Start Date
                disabled={!data.startDate} // Disable if Start Date is not filled
              />
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
      <Button color="success" disabled={!data.endDate} onClick={handleRequestData}>
        Generate report
      </Button>
      <ToastContainer/>
    </>

  )
}

export default PaymentDatesReport;