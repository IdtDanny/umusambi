

import {
    FormGroup,
    Form,
    Input,
    Row,
    Button,
    Col,
} from "reactstrap";

const Visitordetails = ({ data, onPrevious, proceed }) => {
    return (
        <Form>
            <h6 className="heading-small text-muted mb-4">
                User information
            </h6>
            <div className="pl-lg-4">
                <Row>
                    <Col lg="6">
                        <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                            >
                                First name
                            </label>
                            <Input
                                style={{ color: 'black' }}
                                className="form-control-alternative"
                                id="input-first-name"
                                placeholder="First name"
                                type="text"
                                defaultValue={data.firstname}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                            >
                                Last name
                            </label>
                            <Input
                                style={{ color: 'black' }}
                                className="form-control-alternative"
                                id="input-last-name"
                                placeholder="Last name"
                                type="text"
                                defaultValue={data.lastname}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <hr className="my-4" />
            {/* Address */}
            <h6 className="heading-small text-muted mb-4">
                Contact information
            </h6>
            <div className="pl-lg-4">
                <Row>
                    <Col lg="6">
                        <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                            >
                                Email
                            </label>
                            <Input
                                style={{ color: 'black' }}
                                className="form-control-alternative"
                                id="input-first-name"
                                placeholder="First name"
                                type="text"
                                defaultValue={data.email}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                            >
                                Phone
                            </label>
                            <Input
                                style={{ color: 'black' }}
                                className="form-control-alternative"
                                id="input-last-name"
                                placeholder="Last name"
                                type="text"
                                defaultValue={data.phone}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <div className="">
                    <Row>
                    <Col lg="6">
                    <Button
                color="success"
                style={{width:'500px'}}
                onClick={() => proceed()}
              >
                Proceed to booking
              </Button>
                    </Col>
                    </Row>
                </div>
            </div>
        </Form>
    )
}

export default Visitordetails;