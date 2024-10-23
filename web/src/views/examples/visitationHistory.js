import { useState, useEffect } from 'react'
import DeleteModal from './deleteModal';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import Navbar from "components/Navbars/Navbar.js";

const VisitationHistory = () => {
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    nID: '',
    phone: ''
  });
  const NavigateToUpdate = (id) => {
    //event.preventDefault();
    navigate("/update/" + id)
    console.log("executed")
}
const toggleDelete = (person) => {
  setShowDelete(!showDelete);
  setUser(person);
};
const navigate = useNavigate();
useEffect(() => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      'x-auth-token': JSON.parse(localStorage.getItem("token"))
    },
  }
  fetch("http://localhost:7000/api/admin/history", requestOptions)
    .then((response) => {
      if (!response.ok) {

        setMessage("PLEASE RETRY")
      }
      return response.json();
    })
    .then(visitor => {
      console.log(visitor)
      setData(visitor);
    })
    .catch(error => {
      console.log(error.message)
      setMessage("connect your server")
    })
}, []);

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
            <CardHeader className="border-0">
              <h3 className="mb-0">Registered Visitors</h3>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">FIRST NAME</th>
                  <th scope="col">LAST NAME</th>
                  <th scope="col">NATIONAL IDENTITY</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">VISITATION DATE</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {data.map((person) => {
                  return (
                    <tr key={person._id}>
                      <th scope="row">
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-primary" />
                          <span className="mb-0 text-sm">
                            {person.visitor.firstname}
                          </span>
                        </Badge>
                      </th>
                      <td>{person.visitor.lastname}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-info" />
                          {person.nID}
                        </Badge>
                      </td>
                      <td>
                        <div>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-warning" />
                            {person.visitor.email}
                          </Badge>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">
                            {person.arrivalTime}
                          </span>
                        </div>
                      </td>
                    </tr>)
                })}
              </tbody>
            </Table>
            <CardFooter className="py-4">
              <nav aria-label="...">
                <h5><span className="mb-0 text-sm">THANK YOU</span></h5>
              </nav>
            </CardFooter>
          </Card>
        </div>
      </Row>
    </Container>

    <div>
      {/* deleteee */}
      {showDelete && (<div className="modal-backdrop show" onClick={toggleDelete}></div>)}
      <DeleteModal showDelete={showDelete} toggleDelete={toggleDelete} user={user} />
    </div>
  </>
);
};

export default VisitationHistory;
