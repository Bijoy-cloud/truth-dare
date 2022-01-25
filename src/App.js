import "./App.css";
import bottle from "./ttm-bottle.svg";
import { useEffect, useState } from "react";
import Board from "./component/Board/board";
import PopUpModal from "./component/PopUpModal/PopUpModal";
import { data18, data } from "./component/data";
function App() {
  const [checked, setChecked] = useState(false);
  const [timedelay, setTimedelay] = useState(false);
  const [inputModalShow, setInputModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [playerNumber, setPlayerNumber] = useState("");
  const [deg, setDeg] = useState(0);
  const [user, setUser] = useState(6);
  const [addInput, setAddInput] = useState(false);
  const [answer, setanswer] = useState("");

  // console.log('random q is',Math.floor(Math.random()*Data.length))

  let randomize = (arr, n) => {
    for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };
  function randomQuestion() {
    if (checked === false) {
      randomize(data, data.length);
      console.log("temp is", data);
      setanswer(data[Math.floor(Math.random() * data.length)]);
      // console.log("previous question is", q1);
    } else {
      randomize(data18, data18.length);
      setanswer(data18[Math.floor(Math.random() * data18.length)]);
    }
  }
  function handleAddUser(e) {
    console.log("check");
    e.preventDefault();
    let input = e.target[0].value;
    if (input < 2 || input > 12) {
      alert("Minimum 2 Players and Maximum 12 Players allowed");
    } else {
      setInputModalShow(false);
      setUser(input);
    }
  }
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function clickHandler(params) {
    const sliceAngle = 360 / user;
    if (user > 2) {
      let randomUser = getRandom(1, user);
      let rotateAngle = sliceAngle * (randomUser - 1) + sliceAngle / 2 + 720;
      setDeg(`${rotateAngle}`);
      setPlayerNumber(randomUser);
      setTimeout(() => {
        setModalShow(true);
        randomQuestion();
        setDeg(0);
      }, 2000);
    } else {
      let randomUser = getRandom(0, 1);
      let rotateAngle = randomUser * sliceAngle + 720;
      console.log("ab is", randomUser);
      console.log("a is", rotateAngle);
      setDeg(`${rotateAngle}`);
      setPlayerNumber(randomUser + 1);
      setTimeout(() => {
        setModalShow(true);
        randomQuestion();
        setDeg(0);
      }, 2000);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setInputModalShow(true);
      setTimedelay(true);
    });
  }, [timedelay]);
  function feedbackUpload(e) {
    e.preventDefault();
    // let data = e.target[0].value
    //     fetch('https://example.com/profile', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:');
    // })
    // .catch((error) => {
    //   console.error('Error:');
    // });
  }
  return (
    <div className="App">
      <div className="filter">
        <label className="mytoggle" htmlFor="mytoggle">
          {" "}
          18+ question
          <input
            className="toggle_input"
            name="toggle_input"
            type="checkbox"
            onChange={() => {
              setChecked(!checked);
            }}
            id="mytoggle"
          />
          <div className="toggle_fill" />
        </label>
      </div>
      <div className="board-container">
        <Board name={user} addInput={addInput} />
        <img
          className="bottleImg"
          style={{ transform: `rotate(${deg}deg)` }}
          src={bottle}
          alt="Beer Boottle->"
          onClick={clickHandler}
        />
      </div>
      <div className="spinBtn" onClick={clickHandler}>
        <span>spin</span>
      </div>

      <div className="restartGame">
        <label className="restartLabel">Want to Restart the Game</label>
        <button
          className="restartBtn"
          onClick={() => {
            setInputModalShow(true);
          }}
        >
          Restart
        </button>
      </div>
      <PopUpModal
        modalContent={
          <form onSubmit={handleAddUser}>
            <label>Enter Player Number</label>
            <input type="number" name="playerCount" />
            <button onClick={() => setAddInput(!addInput)} type="submit">
              Add
            </button>
          </form>
        }
        show={inputModalShow}
        onHide={() => setInputModalShow(false)}
      />

      <PopUpModal
        playerNumber={playerNumber}
        checked={checked}
        show={modalShow}
        modalContent={
          <>
            <h4>{`player ${playerNumber} tell us`} </h4>
            <p style={{ display: "block" }}> {answer}</p>
          </>
        }
        answer={answer}
        onHide={() => setModalShow(false)}
      />
      <form onSubmit={feedbackUpload} className="feedback">
        <label>Suggest us some question to ask</label>
        <textarea name="feedback" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
