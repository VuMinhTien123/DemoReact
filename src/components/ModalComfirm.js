
import {Modal, Button} from 'react-bootstrap'
import { deleteUser } from '../services/UserServices';
import { Toast, toast } from 'react-toastify';

const ModalComfirm = (props) => {
    const {show,handleClose, dataUserDelete , handleDeleteUserFromModal} = props;
   
const ComfirmDelete = async () => {
    let res = await deleteUser(dataUserDelete.id)
    if(res && +res.statusCode === 204) {
        toast.success("delete user succeed")
        handleClose();
        handleDeleteUserFromModal(dataUserDelete)
    } else {
        toast.error("error delete user")
    }
    console.log(res)
}
    
  return (
    <Modal 
    show={show} 
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    >
        <Modal.Header closeButton>
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body-add-new'>
         This action can't be undone

         Do you want to delete this user
         <br />
         <b>email = {dataUserDelete.email}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => ComfirmDelete()}>
            Comfirm
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ModalComfirm
