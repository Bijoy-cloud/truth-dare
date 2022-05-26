import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Form, Button } from "react-bootstrap";
import * as fiicons from "react-icons/fi";
import bottle from "./tt.png";
import { useEffect, useState } from "react";
import Board from "./component/Board/board";
import PopUpModal from "./component/PopUpModal/PopUpModal";
import { data18, data } from "./component/data";
import ToggleSwitch from "./component/ToggleSwitch";
import { IconButton } from "@mui/material";
function App() {
  const [questionmodal, setQuestionModal] = useState(true);
  const [spinCount, setspinCount] = useState(0);
  const [counter, setCounter] = useState(-1);
  const [checked, setChecked] = useState(false);
  const [inputModalShow, setInputModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [playerNumber, setPlayerNumber] = useState("");
  const [deg, setDeg] = useState(0);
  const [user, setUser] = useState(6);
  const [addInput, setAddInput] = useState(false);
  const [temparr, settemparr] = useState([]);

  let randomize = (arr, n) => {
    for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  useEffect(() => {
    if (checked === false) {
      randomize(data, data.length);
      settemparr(data);
    } else {
      randomize(data18, data18.length);
      settemparr(data18);
    }
  }, [temparr, checked]);

  function randomQuestion() {
    // console.log('teamparr is',temparr)
    if (counter < temparr.length - 1) {
      setCounter((prev) => prev + 1);
    } else {
      settemparr([]);
      setCounter(0);
    }
  }

  function handleAddUser(e) {
    setQuestionModal(false);
    e.preventDefault();

    let input = e.target[0].value;
    if (input < 2 || input > 12) {
      alert("Minimum 2 Players and Maximum 12 Players allowed");
    } else {
      setspinCount(0);
      setAddInput(!addInput);
      setInputModalShow(false);
      setUser(input);
      setQuestionModal(true);
    }
  }
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function clickHandler(params) {
    setspinCount((prev) => prev + 1);
    const sliceAngle = 360 / user;
    if (user > 2) {
      let randomUser = getRandom(1, user);
      let rotateAngle =
        sliceAngle * (randomUser - 1) + sliceAngle / 2 + 20 * 360;
      setDeg(`${rotateAngle}`);
      setPlayerNumber(randomUser);
      setTimeout(() => {
        setModalShow(true);
        randomQuestion();
        setDeg(0);
      }, 4500);
    } else {
      let randomUser = getRandom(0, 1);
      let rotateAngle = randomUser * sliceAngle + 10 * 720;
      // console.log("ab is", randomUser);
      // console.log("a is", rotateAngle);
      setDeg(`${rotateAngle}`);
      setPlayerNumber(randomUser + 1);
      setTimeout(() => {
        setModalShow(true);
        randomQuestion();
        setDeg(0);
      }, 4500);
    }
  }
  useEffect(() => {
    setInputModalShow(true);
  }, []);
  
  return (
    <>
      <div className="App">
        <h2>Truth And Dare</h2>
        <div
          className="filter"
          onChange={() => {
            setChecked(!checked);
          }}
        >
          <ToggleSwitch />
        </div>

        <div className="board-border">
          <div className="board-container">
            <Board name={user} addInput={addInput} />
            <div className="inside-circle" />
            <img
              className={`bottleImg ${modalShow ? "fast" : ""}`}
              style={{ transform: `rotate(${deg}deg)` }}
              src={bottle}
              alt="Beer Boottle->"
              onClick={clickHandler}
            />
          </div>
        </div>

        <IconButton onClick={clickHandler} className="spinBtn" size="large">
          {/* <div className="spinBtn"> */}
          <fiicons.FiRotateCw size="60px" color="#333" />
          {/* </div> */}
        </IconButton>

        <div className="restartGame">
          <label className="restartLabel">Spin {`${spinCount}`} times</label>

          <Button
            className="restartBtn"
            onClick={() => {
              setInputModalShow(true);
            }}
            color="success"
            size="small"
            variant="contained"
          >
            Restart The Game
          </Button>
        </div>
        <PopUpModal
          modalcontent={
            <Form onSubmit={handleAddUser}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Player Number</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter Player Number"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          }
          show={inputModalShow}
          onHide={() => setInputModalShow(false)}
        />

        <PopUpModal
          questionmodal={questionmodal.toString()}
          checked={checked}
          show={modalShow}
          modalcontent={
            <>
              <h4>{`Player ${playerNumber} Your ${checked?'Dare':'Truth'} Question is`} </h4>{" "}
              {/*question update */}
              <p style={{ display: "block" }}> {temparr[counter]}</p>
            </>
          }
          answer={temparr[counter]}
          onHide={() => setModalShow(false)}
        />
      </div>
    </>
  );
}

export default App;
