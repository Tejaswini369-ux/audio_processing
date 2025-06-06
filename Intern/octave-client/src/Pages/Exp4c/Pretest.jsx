import React, { useState } from 'react';

const Quiz = () => {
  const questions = [
    {
      question: "The Fourier Transform of a rectangle function is",
      options: ["Delta function", "Unit Step Function", "Sinc Function", "Exponential Function"],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., Sinc Function"
    },
    {
      question: "Considering an audio signal which of the statements related to Fourier Transform are correct?",
      options: ["Conversion from Time-domain representation of audio signal into an equivalent representation in the frequency domain takes place.", "Conversion from Frequency-domain representation of audio signal into an equivalent representation in the time domain takes place.", "None of above", "All of above"],
      answer: [0],
      explanation: "Correct answer is Option 1 i.e., Conversion from Time-domain representation of audio signal into an equivalent representation in the frequency domain takes place."
    },
    {
      question: "What does frequency analysis of a speech signal involve?",
      options: ["Frequency analysis involves combining different frequencies components of speech signals to obtain complex sound signals.", "Frequency analysis of a speech involves addition of multiple speech signals of different duration to get a single signal", "Frequency analysis involves decomposing complex speech signals into their fundamental frequencies.", "All of the above"],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., Frequency analysis involves decomposing complex speech signals into their fundamental frequencies."
    },
    {
      question: "What does the frequency of a sinusoidal signal indicate?",
      options: ["The number of times the sine wave goes through a complete cycle in the space of 0.5second.", "The number of times the sine wave goes through a complete cycle in the space of 1 second.", "The number of times the sine wave goes through a complete cycle in the space of 2 second.", "The number of times the sine wave goes through a complete cycle in the space of 1.5 second."],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., The number of times the sine wave goes through a complete cycle in the space of 1 second."
    },
    {
      question: "What are the two important parameters associated with the frequency response in the case of speech signal?",
      options: ["Duration", "Sampling Frequency", "Magnitude", "Phase"],
      answer: [2,3],
      explanation: "Correct answers are Option 3 and Option 4 i.e., Magnitude and Phase"
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
