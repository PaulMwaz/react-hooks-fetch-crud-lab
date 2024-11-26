import React from "react";

function QuestionList({ questions, deleteQuestion, updateQuestion }) {
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => deleteQuestion(id))
      .catch((error) => console.error("Error deleting question:", error));
  };

  const handleUpdate = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => updateQuestion(updatedQuestion))
      .catch((error) => console.error("Error updating question:", error));
  };

  return (
    <ul>
      {questions.map((question) => (
        <li key={question.id}>
          <p>{question.prompt}</p>
          <select
            value={question.correctIndex}
            onChange={(e) =>
              handleUpdate(question.id, parseInt(e.target.value, 10))
            }
          >
            {question.answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer}
              </option>
            ))}
          </select>
          <button onClick={() => handleDelete(question.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default QuestionList;
