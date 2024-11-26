import React, { useState } from "react";

function QuestionForm({ addQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAnswersChange = (index, value) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = value;
    setFormData({ ...formData, answers: updatedAnswers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newQuestion) => {
        addQuestion(newQuestion);
        setFormData({ prompt: "", answers: ["", "", "", ""], correctIndex: 0 });
      })
      .catch((error) => console.error("Error adding question:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="prompt"
        value={formData.prompt}
        onChange={handleChange}
        placeholder="Enter question prompt"
      />
      {formData.answers.map((answer, index) => (
        <input
          key={index}
          type="text"
          value={answer}
          onChange={(e) => handleAnswersChange(index, e.target.value)}
          placeholder={`Answer ${index + 1}`}
        />
      ))}
      <select
        name="correctIndex"
        value={formData.correctIndex}
        onChange={handleChange}
      >
        {formData.answers.map((_, index) => (
          <option key={index} value={index}>
            {index + 1}
          </option>
        ))}
      </select>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
