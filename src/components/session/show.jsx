import {Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";

export default function SessionModal({show, handleClose, session}) {
    const submitHandler = (data) => {
        console.log(data)
    }
    return (
        <Modal show={show} onClose={handleClose} onHide={handleClose} centered>
        <ModalHeader closeButton>
            <ModalTitle>
                Edit session
            </ModalTitle>
        </ModalHeader>
        <ModalBody>
        </ModalBody>
        <ModalFooter>
            <button className='btn btn-outline-success'>Save</button>
            <button className='btn btn-outline-danger' onClick={handleClose}>Close</button>
        </ModalFooter>
    </Modal>
    )
}