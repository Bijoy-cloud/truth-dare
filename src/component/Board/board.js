
import React from "react";
import "./board.css";

function Board(props) {
  const values = [1,2,3,4,5,6,7,8,9,10,11,12];
  function getRandomColor() {
    let color = "#";
    for (let i = 0; i < 3; i++)
      color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
    return color;
  }

  function showBoard(user) {
    if (user > 2) {
      const rotateAngle = 360 / user;
      var skewAngle = rotateAngle - 90;

      const arr = values.slice(0, user);
      return arr.map((item, index) => {
        return (
          <li 
          className="lis"
          key={index}
        
            style={{
              transform: `rotate(${index * rotateAngle}deg) skewY(${skewAngle}deg)`,
              background:  `${getRandomColor()}`,
            }}
          >
        
            <div
              className={`text nth${arr.length}`}
              style={{ transform: `rotate(${0}deg) skewY(${-skewAngle}deg)  ` }}
            >
              {index + 1}
            </div>
          </li>
        );
      });
    } else {
      return (
        <>
          <li className="div1">
            <div className="div1-text">1</div>
          </li>
          <li className="div2">
            <div className="div2-text">2 </div>
          </li>
        </>
      );
    }
  }

  return (
    <>
      <ul className="circle">{showBoard(props.name)}</ul>
    </>
  );
}

export default Board;
