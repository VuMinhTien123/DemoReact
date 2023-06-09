import React, { useEffect, useState } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { putUpdateUser } from '../services/UserServices';
import {  toast } from 'react-toastify';


const ModalEditUser = (props) => {
    const {show,handleClose, dataUserEdit, handleEditUserFromModal } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("")

    const handleEditUser = async () => {
     let res = await putUpdateUser(name, job)
     if(res && res.updatedAt) {
        handleEditUserFromModal({
            first_name: name,
            id : dataUserEdit.id
        })
        handleClose();
        toast.success('update user succeed')
     }
    }
    
    useEffect(() => {
        if(show) {
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit])

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body-add-new'>
          
  <div class="mb-3">
    <label className="form-label">Name</label>
    <input 
    type="text" 
    className="form-control" 
    value={name} 
    onChange={(event) => setName(event.target.value)}
    />
  </div>
  <div class="mb-3">
    <label className="form-label">job</label>
    <input type="text" 
    className="form-control" 
    value={job} 
    onChange={(event) => setJob(event.target.value)}
    />
  </div>
 
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Comfirm
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ModalEditUser
