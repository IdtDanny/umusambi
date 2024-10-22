import { useState } from "react";

import {
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";

const FindVisitor = ({ onNext, setVisitordata }) => {
    const [message, setMessage] = useState('');

    const [data, setData] = useState({
        nID: '',
    });
    const [visitor, setVisitor] = useState({});
    const [show, setShow] = useState(false);
    function submitHandler(event) {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem("token"))
            },
            body: JSON.stringify(data)
        }
        
        fetch("http://localhost:7000/api/admin/findonevisitor", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    setMessage("an error occured")
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data.code === "no") {
                    setShow(false);
                }
                else {
                    if (data.code === "yes") {
                        setVisitor(data.message)
                        setVisitordata(data.message)
                        setShow(true);
                        onNext();
                        console.log(data.message);
                    }
                }
            })
            .catch(error => {
                console.log(error.message)
                setMessage("connect your server")
            })
    }
    return (
        <>
            <div className="m-5">
                {message}
                <Col xl="8" >
                    <Form onSubmit={submitHandler}>
                        <h6 className="heading-small  mb-4" style={{ color: 'black' }}>
                            Enter National id information
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="8">
                                    <FormGroup>
                                        <label
                                            style={{ color: 'black' }}
                                            className="form-control-label"
                                            htmlFor="input-first-name"
                                        >
                                            National identification
                                        </label>
                                        <Input
                                            style={{ color: 'black',border:'0.2px solid black' }}
                                            className="form-control-alternative"
                                            id="input-first-name"
                                            placeholder="National identification"
                                            type="text"
                                            onChange={(e) => setData({ nID: e.target.value })}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="8">
                                    <input type="submit"
                                        className="mx-2 btn btn-success btn-lg"
                                        style={{ width: '300px', height: '50px' }}
                                        value="Find visitor" />
                                </Col>
                            </Row>
                        </div>
                    </Form >
                </Col>
            </div>
        </>
    )
}
export default FindVisitor;