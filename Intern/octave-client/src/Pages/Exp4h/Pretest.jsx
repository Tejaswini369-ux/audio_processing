import React, { useState } from 'react';

const Quiz = () => {
  const questions = [
    {
      question: "What is the spectral centroid in an audio signal?",
      options: ["The highest frequency component of the signal", "The central frequency around which the energy of the spectrum is concentrated", "The total duration of the audio file", "The amplitude of the loudest frequency"],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., The central frequency around which the energy of the spectrum is concentrated"
    },
    {
      question: "What does spectral bandwidth measure in an audio signal?",
      options: ["The difference between the highest and lowest pitch", "The spread of frequencies around the spectral centroid", "The number of frequency bands in an audio file", "The total energy in an audio signal"],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., The spread of frequencies around the spectral centroid "
    },
    {
      question: "Which Python library is commonly used to extract spectral features from an audio signal?",
      options: ["OpenCV", "Matplotlib", "Librosa", "NumPy"],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., Librosa"
    },
    {
      question: "How is spectral centroid mathematically computed?",
      options: ["By summing all frequency components", "By calculating the weighted mean of the frequencies present in the signal", "By taking the highest peak in the spectrum", "By normalizing the audio signal"],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., By calculating the weighted mean of the frequencies present in the signal"
    },
    {
      question: "Which of the following applications uses spectral centroid and bandwidth analysis?",
      options: ["Speech and music classification", "Image recognition", "Text summarization", "Video segmentation"],
      answer: [0],
      explanation: "Correct answer is Option 1 i.e., Speech and music classification"
    }
  ];

  const [selectedOptions, setSelectedOptions] = useState(
    questions.map(q => (q.answer.length > 1 ? [] : null))
  );
  const [showExplanations, setShowExplanations] = useState(false);

  const handleOptionSelect = (questionIndex, optionIndex, isMultiple) => {
    setSelectedOptions(prevOptions => {
      const updatedOptions = [...prevOptions];

      if (isMultiple) {
        const selectedForQuestion = new Set(updatedOptions[questionIndex] || []);
        if (selectedForQuestion.has(optionIndex)) {
          selectedForQuestion.delete(optionIndex);
        } else {
          selectedForQuestion.add(optionIndex);
        }
        updatedOptions[questionIndex] = Array.from(selectedForQuestion);
      } else {
        updatedOptions[questionIndex] = [optionIndex];
      }

      return updatedOptions;
    });
  };

  const handleSubmit = () => {
    setShowExplanations(true);
  };

  const score = selectedOptions.reduce((acc, selected, index) => {
    const correctAnswers = new Set(questions[index].answer);
    const selectedSet = new Set(selected);

    return correctAnswers.size === selectedSet.size && [...correctAnswers].every(ans => selectedSet.has(ans))
      ? acc + 1
      : acc;
  }, 0);

  return (
    <div className="postquiz font-sans text-sm">
      <ol>
        {questions.map((question, index) => {
          const isMultiple = question.answer.length > 1;

          return (
            <li key={index} className="py-4">
              <h3 className="mb-2 font-semibold">{`${index + 1}. ${question.question}`}</h3>
              <ul className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <input
                      type={isMultiple ? "checkbox" : "radio"}
                      id={`option-${index}-${optionIndex}`}
                      name={`question-${index}`}
                      value={option}
                      checked={
                        isMultiple
                          ? selectedOptions[index]?.includes(optionIndex)
                          : selectedOptions[index]?.[0] === optionIndex
                      }
                      onChange={() => handleOptionSelect(index, optionIndex, isMultiple)}
                    />
                    <label htmlFor={`option-${index}-${optionIndex}`} className="ml-2">{option}</label>
                  </li>
                ))}
              </ul>
              {showExplanations && (
                <div className="mt-2 space-y-2">
                  <p
                    className={
                      questions[index].answer.every(ans => selectedOptions[index]?.includes(ans)) &&
                      questions[index].answer.length === (selectedOptions[index]?.length || 0)
                        ? "text-green"
                        : "text-red-500"
                    }
                  >
                    {questions[index].answer.every(ans => selectedOptions[index]?.includes(ans)) &&
                    questions[index].answer.length === (selectedOptions[index]?.length || 0)
                      ? "Correct"
                      : "Incorrect"}
                  </p>
                  <p className="text-blue-500">Explanation: {question.explanation}</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <button
        onClick={handleSubmit}
        className="mt-5 bg-blue-button hover:bg-blue-hover rounded-lg px-2 py-1 w-1/5"
      >
        Submit
      </button>
      {showExplanations && (
        <div className="mt-2">
          <p className="font-bold">Your Score: {score}/{questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
