import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MdSpeakerNotes } from 'react-icons/md'

const WorkoutNotes = ({ notes }) => {
  const [isOpen, setIsOpen] = useState(false)

  const showModel = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      {notes ? (
        <div>
          <button onClick={showModel} className='btn btn-sm btn-info mb-2'>
            Notes
          </button>
          <Modal show={isOpen}>
            <Modal.Header>Workout Notes</Modal.Header>
            <Modal.Body>{notes}</Modal.Body>
            <Modal.Footer>
              <button className='btn btn-danger' onClick={closeModal}>
                Close
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        ' '
      )}
    </>
  )
}

export default WorkoutNotes
