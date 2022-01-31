import React from "react";
import "./popUpModal.scoped.css";
import logo from "./menu-logo.svg";
// import { Button } from "@mui/material";
import { AiOutlineClose } from 'react-icons/ai';
function PopUpModal(props) {
 
  if (!props.show) return null;
  else
    return (
      <div className="mymodal">
        <div className="modal">
          <div className="modal-header">
            <img className="logo" src={logo} alt="icon" />
            <div className="close-icon" onClick={props.onHide}>
            <AiOutlineClose /> 
            </div>         </div>
          <div className="modal-content">{props.modalContent}</div>
          <div className="modal-footer">
            {/* <Button
              style={{
                backgroundColor: "grey",
              }}
              size="small"
              variant="contained"
              onClick={props.onHide}
            >
              Close
            </Button> */}

            <button className="close" onClick={props.onHide}>
              close
            </button>
          </div>
        </div>
      </div>
    );
}

export default PopUpModal;
