import { Component } from "react";
import Question from "./Question";

class QuestionList extends Component {
  state = {
    points: 0,
    currentIndex: 0,
  };

  render() {
    const list = this.props.list.map((listItem, index) => {
      const QuestionItem =
        this.state.currentIndex === index ? (
          <Question
            data={listItem}
            onCorrectAnswer={() =>
              this.setState({
                points: this.state.points + 1,
                currentIndex: this.state.currentIndex + 1,
              })
            }
            onWrongAnswer={() => {
              this.setState({
                points: this.state.points,
                currentIndex: this.state.currentIndex + 1,
              });
            }}
          />
        ) : null;
      return <div key={index}>{QuestionItem}</div>;
    });

    const buttonStyle = {
      padding: "1rem",
      fontSize: "1rem",
      border: "none",
      borderRadius: "5px",
      boxShadow: "2px 2px 2px #333",
    };

    // Message at start of quiz and after completing all question
    const buttonName =
      this.state.currentIndex === 0 ? "Start The Quiz" : "Play Again";
    const info =
      this.state.currentIndex !== 0 ? (
        <div>
          <p>You have completed all questions</p>
          <p>{`You have scored  ${this.state.points} out of ${list.length}`}</p>
          <p>{`${((this.state.points * 100) / list.length).toFixed(
            2
          )}% answers are right`}</p>
        </div>
      ) : (
        <div>
          <p>{`You have to attempt all the questions to get final result`}</p>
        </div>
      );

    const message =
      this.state.currentIndex === list.length ? (
        <div>
          {info}
          <div>
            <button
              onClick={() => {
                this.setState({ points: 0, currentIndex: 0 });
                this.props.onClickHandler();
              }}
              style={buttonStyle}
            >
              {buttonName}
            </button>
          </div>
        </div>
      ) : (
        ""
      );

    return (
      <div>
        <h3>Score: {this.state.points}</h3>
        <div>{list}</div>
        <div>{message}</div>
      </div>
    );
  }
}

export default QuestionList;
