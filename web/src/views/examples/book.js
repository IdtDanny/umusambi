import { useState } from "react";
import PaymentModal from "./paymentModal";
import {
    Badge,
    Table,
    Card,
    Button,
    CardHeader,
    CardFooter,
    CardBody
} from "reactstrap";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Book = ({ data,reset }) => {
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const initiatePayment=()=>{
        toast.success("Initiated payment", {
            position: "top-left"
          });
        setShow(true)
    }
    const toggleModal = () => {
        setShow(!show);
        if(!(show===false))
        {
            reset();
        }
      };
    function booknow() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem("token"))
            },
            body: JSON.stringify(data)
        }
        fetch("http://localhost:7000/api/visitor/book", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    toast.error("unable to book please contact admin", {
                        position: "top-right"
                      });
                }
                else {
                    toast.success("Successfully payed", {
                        position: "top-right"
                      });
                }
            })
            .catch(error => {
                console.log(error)
                setMessage("connect your server")
            })
    }
    return (
        <>
            <Card className="shadow">
                <CardHeader className="border-0">
                    <h3 className="mb-0">booking details</h3>
                </CardHeader>
                <CardBody>
                    <Table className="align-items-center table-flush" responsive>
                        <tbody>
                            <tr>
                                <td>
                                    <i className="bg-primary" />
                                    <span className="mb-0 text-md">
                                        FIRST NAME
                                    </span>
                                </td>
                                <td>
                                    <Badge color="" className="badge-dot mr-4">
                                        <i className="bg-info" />
                                        {data.firstname}
                                    </Badge>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="mb-0 text-sm">
                                        Last name
                                    </span>
                                </td>
                                <td>
                                    <Badge color="" className="badge-dot mr-4">
                                        <i className="bg-info" />
                                        {data.lastname}
                                    </Badge>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="mb-0 text-sm">
                                        NATIONAL IDENTITY
                                    </span>
                                </td>
                                <td>
                                    <Badge color="" className="badge-dot mr-4">
                                        <i className="bg-info" />
                                        {data.nID}
                                    </Badge>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="mb-0 text-sm">
                                        FEES
                                    </span>
                                </td>
                                <td>
                                    <Badge color="" className="badge-dot mr-4">
                                        <i className="bg-info" />
                                        3000 RWF
                                    </Badge>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <span className="mb-0 text-sm">
                                        ARRIVAL TIME
                                    </span>
                                </td>
                                <td>
                                    <Badge color="" className="badge-dot mr-4">
                                        <i className="bg-info" />
                                        {Date.now()}
                                    </Badge>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
                <CardFooter>
                    <Button
                        color="success"
                        onClick={initiatePayment}
                        style={{ width: '500px' }}
                    >
                        Book visit
                    </Button>
                </CardFooter>
            </Card>

            <div>
                {/* information */}
                <PaymentModal visible={show} booknow={booknow} toggleModal={toggleModal} message={"successfully booked"} />
                <ToastContainer/>
            </div>

        </>
    )
}

export default Book;