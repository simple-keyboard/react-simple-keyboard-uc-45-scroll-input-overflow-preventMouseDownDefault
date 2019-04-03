import React, { Component } from "react";
import { render } from "react-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";

class App extends Component {
  state = {
    layoutName: "default",
    input: ""
  };

  onChange = input => {
    let caretPosition = this.keyboardRef.keyboard.caretPosition;

    this.setState(
      {
        input: input
      },
      () => {
        if (caretPosition === null) caretPosition = input.length;
        this.setInputCaretPosition(this.inputRef, caretPosition);
      }
    );

    console.log("Input changed", input, caretPosition);
  };

  setInputCaretPosition = (elem, pos) => {
    if (elem.setSelectionRange) {
      elem.focus();
      elem.setSelectionRange(pos, pos);

      /**
       * Scrolling when caret is at the end of input
       */
      if (pos === elem.value.length) elem.scrollLeft = elem.scrollWidth;
    }
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = event => {
    let input = event.target.value;
    this.setState(
      {
        input: input
      },
      () => {
        this.keyboardRef.keyboard.setInput(input);
      }
    );
  };

  render() {
    return (
      <div>
        <input
          ref={r => (this.inputRef = r)}
          value={this.state.input}
          placeholder={"Tap on the virtual keyboard to start"}
          onChange={e => this.onChangeInput(e)}
        />
        <Keyboard
          ref={r => (this.keyboardRef = r)}
          layoutName={this.state.layoutName}
          onChange={input => this.onChange(input)}
          onKeyPress={button => this.onKeyPress(button)}
          preventMouseDownDefault={true}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
