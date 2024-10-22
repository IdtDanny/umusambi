import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: ""
});
const [msg, setMsg] = useState("");
const navigate = useNavigate();
function loginHandler(e) {
    e.preventDefault();
    const methodOptions = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/JSON",
        },
    };
    fetch("http://localhost:7000/api/admin/login", methodOptions)
        .then((response) => {
            if (!response.ok) {
              console.log(response)
                console.log("INVALID EMAIL OR PASSWORD");
                setMsg("INVALID EMAIL OR PASSWORD")
            }
            return response.json();
        })
        .then((data) => {
                localStorage.setItem("token", JSON.stringify(data.token))
                console.log(localStorage.getItem("token"))
                if (data.hasOwnProperty("token")) {
                    navigate("/admin")
                }
                else {
                    setMsg("incorrect password or email")
                }
            
        })
        .catch((error) => {
            setMsg("unexpected error occured");
            console.log(error);
        });
}
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>connect with us</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">umusambi village</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small> sign in with credentials</small>
            </div>
            <Form role="form" onSubmit={loginHandler}>
              {msg}
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="username"
                    type="text"
                    autoComplete="new-email"
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password" 
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <input type="submit" className="my-4 btn btn-success" color="primary" value="sign in"/>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          
        </Row>
      </Col>
    </>
  );
};

export default Login;
