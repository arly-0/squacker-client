import {Modal, ModalBody, ModalHeader, ModalTitle} from "react-bootstrap"
import Form from "../global/Form"
import { DateTime } from "luxon"
import {useUpdateSessionMutation} from "../../lib/store/sessions/session-slice-api"
import {useState} from "react";

export default function EditSession({show, handleClose, session}) {
    const [editedSession, setSession] = useState(session)
    const fields = [
        {
            name: 'date',
            label: 'Date',
            value: new DateTime(editedSession.date).toISODate(),
            type: 'date',
        },
        {
            name: 'avg_lap',
            label: 'Average Lap',
            type: 'text',
            value: editedSession.avg_lap,
        },
        {
            name: 'best_lap',
            label: 'Best Lap',
            type: 'text',
            value: editedSession.best_lap,
        },
        {
            name: 'track_length',
            label: 'Track Length',
            type: 'number',
            value: editedSession.track_length,
        },
        {
            name: 'wet',
            label: 'Wet',
            type: 'checkbox',
            value: editedSession.wet
        },
        {
            name: 'note',
            label: 'Note',
            type: 'text',
            value: editedSession.note,
            maxLength: 150,
        }
    ]
    const [updateSession] = useUpdateSessionMutation()
    const submitHandler = (data) => {
        if(data.date) data.date = new Date(data.date).toISOString()
        console.log(data)
        return updateSession(session.id, data).then(response => {
            console.log(response.data)
        })
    }
    return (
        <Modal show={show} onClose={handleClose} onHide={handleClose} centered>
            <ModalHeader closeButton>
                <ModalTitle>
                    Edit session
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form fields={fields} submitFunction={submitHandler} onCancel={handleClose}/>
            </ModalBody>
        </Modal>
    )
}