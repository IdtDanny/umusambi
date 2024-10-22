import { useState } from "react";

const DeleteModal = ({ showDelete, toggleDelete, user}) => {
    const [message, setMessage] = useState('');
    function submitHandler() {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem("token"))
            },
            body: JSON.stringify(user)
        }
        fetch("http://localhost:7000/api/admin/deletevisitor", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setMessage("User deleted successfully")
                }
                else {
                    setMessage("Not able to delete");
                }
            })
            .catch(error => {
                console.log(error.message)
                setMessage("connect your server")
            })
    }

    return (
        <>
            <div className={`modal ${showDelete ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showDelete ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>are u sure u want to delete {user.firstname}  {user.lastname} ? </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={toggleDelete}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={submitHandler}>
                                DELETE USER
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DeleteModal;