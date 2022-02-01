// import { Button } from "bootstrap";
import React from "react";
import { Modal , Button} from 'react-bootstrap';

function PopUpModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Game Of Truth
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       {props.modalcontent}
      </Modal.Body>
      { props.questionmodal &&
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button> 
      </Modal.Footer>
      }
    </Modal>
  );
}
export default PopUpModal;