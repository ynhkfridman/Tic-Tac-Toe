import React from "react";

export default function GameSquare(props){

    return (
        <div className="GameSquare-card" onClick={props.click}>
            {props.isMark ? props.isCircle? "O" : "X" : "" }           
        </div>
    )
}