import React, { useState } from "react";

function QuestionItem({ question, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const [isDeleting, setIsDeleting] = useState(false);

  function handleDeleteClick () {
    if (isDeleting) {
      return
    }

    setIsDeleting(true);

    onDelete(id)
    .then(() => {
      setIsDeleting(false)
    })
    .catch(() => {
      setIsDeleting(false)
    })
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button
      onClick={handleDeleteClick}
      disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete Question"}</button>
    </li>
  );
}

export default QuestionItem;