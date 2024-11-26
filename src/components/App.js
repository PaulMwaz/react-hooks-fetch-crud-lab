import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch questions on load
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // Add a new question
  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  // Delete a question
  const deleteQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  // Update a question's correct index
  const updateQuestion = (updatedQuestion) => {
    setQuestions(
      questions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "View Questions" : "New Question"}
      </button>
      {showForm ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          deleteQuestion={deleteQuestion}
          updateQuestion={updateQuestion}
        />
      )}
    </div>
  );
}

export default App;
