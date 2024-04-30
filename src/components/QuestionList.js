import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((resp) => resp.json())
    .then((data) => {
      // console.log(question);
      setQuestions(data)
    })
    .catch((err) => console.error("Err:", err))
  }, [])

  function handleDeleteQuestion (id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((resp) => {
      if (resp.status === 200) {
        setQuestions((prevQuestions) => 
          prevQuestions.filter((question) => question.id !== id)
        )
      } else {
        console.error("Failed to delete" + resp.status);
      }
    })
    .catch((err) => {
      console.error("Err dlt qest:", err);
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => {
          // console.log(question);
          return (
            <QuestionItem
            key={question.id} 
            question={question}
            onDelete={handleDeleteQuestion} />
          )
        })}
      </ul>
    </section>
  );
}

export default QuestionList;