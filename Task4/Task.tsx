import React from 'react';

// Convert the below stateful React component to using hooks.

interface State {
  lastClicked?: Date,
  buttonColor: "red" | "blue" | "green"
}

class StatefulComponent extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      lastClicked: undefined,
      buttonColor: "red"
    };
  }

  public render() {
    const {
      lastClicked,
      buttonColor
    } = this.state;

    return (
      <div>
        <button
          onClick={this.onClick}
          style={{ backgroundColor: buttonColor }}
        >
          Click
        </button>
        <p>Last clicked: {lastClicked !== undefined ? lastClicked.toString() : "Never"}</p>
      </div>
    )
  }

  private onClick = () => {
    this.setState({
      lastClicked: new Date(),
      buttonColor: this.getNextButtonColor()
    });
  }

  private getNextButtonColor = (): "red" | "blue" | "green" => {
    switch (this.state.buttonColor) {
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
}
