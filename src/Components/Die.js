import React from "react";

const Die = (props) => {

    return (
        <div className="dice"onClick={props.holdDice}>
            <div className={props.isHeld ? "die held" : "die"}>
                <h3 className="die--count">{props.value}</h3>
            </div>
        </div>
    )
}

export default Die