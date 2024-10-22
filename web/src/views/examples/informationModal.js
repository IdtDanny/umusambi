

const InformationModal = ({ openModal, toggleModal, message}) => {
    return (
        <>
            <div className={`modal ${openModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: openModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>{message}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default InformationModal;