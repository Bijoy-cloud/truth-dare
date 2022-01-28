import React from "react";
import "./board.css";

function Board(props) {
  // var degree =  (i * share)deg skeyY = (share - 90)deg i++;
  const values = [
    {
      color: "#ced206",
    },
    {
      color: "#e24625f5",
    },
    {
      color: "pink",
    },
    {
      color: "#009debf5",
    },
    {
      color: "#169600f2",
    },
    {
      color: "aqua",
    },
    {
      color: "rgb(115, 218, 28)"
    },
    {
      color: "yellow",
    },
    {
      color: "hotpink",
    },
    {
      color: "cyan",
    },
    {
      color: "orange",
    },
    {
      color: "maroon",
    },
    {
      color: "#ca5adc",
    },
  ];
  // Math.floor(Math.random()*16777215).toString(16)
  function showBoard(user) {
    if (user > 2) {
      const rotateAngle = 360 / user;
      var skewAngle = rotateAngle - 90;

      const arr = values.slice(0, user);
      // console.log(arr)
      return arr.map((item, index) => {
        return (
          <li key={index}
            style={{
              transform: `rotate(${index * rotateAngle}deg) skewY(${skewAngle}deg)`,
              background:  `${item.color}`,
            }}
          >
            {/* {console.log('inside map',index*rotateAngle)} */}
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
