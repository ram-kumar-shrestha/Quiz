import "./Question.css";
import React, { Component } from "react";

class Question extends Component {
  state = {
    currentOptionValue: "",
    answer: "",
    selected: false,
    isCorrect: false,
    message: "",
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    if (this.state.selected) {
      if (
        this.state.currentOptionValue === this.state.answer &&
        this.state.selected
      ) {
        this.setState({
          message: `Correct answer`,
          isCorrect: true,
        });

        // total points in parent component
        this.props.onCorrectAnswer();
      } else {
        this.setState({
          message: `Wrong answer`,
          isCorrect: false,
        });
        // when answer is wrong next question without increasing points in parent
        this.props.onWrongAnswer();
      }
    } else {
      this.setState({
        message: "Please! select an option",
        isCorrect: false,
      });
    }
  };

  onChangeHandler = (e) => {
    this.setState({
      currentOptionValue: e.target.value,
      selected: e.target.checked,
    });
  };

  componentDidMount() {
    this.setState({
      answer: this.props.data.answer,
    });
  }

  render() {
    const itemList = this.props.data.options.map((option, index) => {
      return (
        <div className="container--options" key={index}>
          <input
            type="radio"
            value={option}
            name={this.props.data.q_id}
            onChange={this.onChangeHandler}
            checked={this.state.currentOptionValue === option}
            id={index}
          />
          <label htmlFor={index}>{option}</label>
        </div>
      );
    });

    let messageClass = this.state.isCorrect ? "success" : "failure";
    return (
      <React.Fragment>
        <form onSubmit={(e) => this.onSubmitHandler(e)}>
          <h3>{this.props.data.question}</h3>
          {itemList}
          <button type="submit">Submit</button>
        </form>
        <p className={messageClass}>{this.state.message}</p>
      </React.Fragment>
    );
  }
}

export default Question;
