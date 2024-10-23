import React, { useState } from "react";
import { Button, Modal, Spinner } from "reactstrap";

const PaymentModal = ({ toggleModal,booknow, visible, title }) => {
    // State to track payment loading
    const [isLoading, setIsLoading] = useState(true);
    const confirmPayment = (e) => {
        e.preventDefault()
        setIsLoading(false)
        booknow()
        toggleModal()

    }
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
                    {isLoading && (
                        <div className="text-center">
                            <Spinner color="primary" />
                            <p>Loading... Waiting for payment</p>
                            <div className="row">
                                <div className="col-6"></div>

                            </div>
                        </div>
                    ) }
                </div>
                <div className="modal-footer">
                    <div className="col-6">
                        <Button
                            color="primary"
                            onClick={confirmPayment}
                        >
                            Confirm Payment
                        </Button>
                    </div>
                    <Button
                        className="ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={confirmPayment}
                        disabled={isLoading} 
                    >
                        <p> Processing...</p>
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default PaymentModal;
