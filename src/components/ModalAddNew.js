import React, { useState } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { postCreateUser } from '../services/UserServices';
import {  toast } from 'react-toastify';


const ModalAddNew = (props) => {
    const {show,handleClose, handleUpdateTable } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("")
    
    const handSaveUser = async() => {
      let res = await postCreateUser(name, job)
      if(res && res.id) {
        handleClose();
        setName('');
        setJob('');
        toast.success("A USER IS CREATED SUCCEED")
        handleUpdateTable({first_name: name, id: res.id});
      } else {
        toast.error("AN ERROR...")
      }
    }

  return (
    <Modal 
    show={show} 
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    >
        <Modal.Header closeButton>
          <Modal.Title>Add New user</Modal.Title>
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
          <Button variant="primary" onClick={() => handSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ModalAddNew
