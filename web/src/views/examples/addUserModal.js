import {
    Button,
    Modal,
  } from "reactstrap";
  
  

const AddUserModal = ({message,toggleModal,visible,title}) => {

    return (
        <>
        <Modal
            className="modal-dialog-centered"
            isOpen={visible}
            toggle={toggleModal}
        >
            <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                    {title}
                </h6>
                <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={toggleModal}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
                <p>
                    {message}
                </p>
            </div>
            <div className="modal-footer">
                <Button color="primary" type="button">
                    Save changes
                </Button>
                <Button
                    className="ml-auto"
                    color="link"
                    data-dismiss="modal"
                    type="button"
                    onClick={toggleModal}
                >
                    Close
                </Button>
            </div>
        </Modal>
        </>
    )

}

export default AddUserModal;