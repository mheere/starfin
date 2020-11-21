import React, { FunctionComponent, useState } from 'react';

// Task 4 - converted stateful React component to using hooks.

// interface State {
//     lastClicked?: Date,
//     buttonColor: "red" | "blue" | "green"
// }

const Task4Component = props => {
    const [buttonColor, setButtonColor] = useState<"red" | "blue" | "green">('red');
    const [lastClicked, setLastClicked] = useState<Date | null>(null);

    const getNextButtonColor = (): "red" | "blue" | "green" => {
        switch (buttonColor) {
            case "red":
                return "blue";
            case "blue":
                return "green";
            case "green":
                return "red";
            default:
                throw new Error("Invalid color");
        }
    }

    const onClick = () => {
        setLastClicked(new Date());
        setButtonColor(getNextButtonColor());
    }

    return (
        <div>
            <button
                onClick={onClick}
                style={{ backgroundColor: buttonColor }}
            >
                Click
            </button>
            <p>Last clicked: {lastClicked !== undefined ? lastClicked.toString() : "Never"}</p>
        </div>
    )
}