import React from "react";
import "./popUpModal.scoped.css";
import logo from "./menu-logo.svg";
// import { Data,General } from "../data";

function PopUpModal(props) {
  
  if (!props.show) return null;
  else
 

    return (
      <div className="mymodal">
        <div className="modal">
          <div className="modal-header">
            <img className="logo" src={logo} alt="icon" />
          </div>
          <div className="modal-content">
          {props.modalContent}
          </div>
          <div className="modal-footer">
            <button className="close" onClick={props.onHide}>
              close
            </button>
          </div>
        </div>
      </div>
    );
}

export default PopUpModal;
