import React, { useState } from 'react';

const Quiz = () => {
  const questions = [
    {
      question: "Which of the following statements related to RMS Energy extraction features from the audio signal are true?",
      options: ["RMS Energy extraction is a frequency domain feature", "RMS Energy extraction is a time domain feature", "RMS Energy extraction feature involves the root mean square computation of the amplitude values of the audio samples", "RMS Energy extraction feature involves the reciprocal of the root mean square computation of the amplitude values of the audio samples"],
      answer: [1, 2],
      explanation: "Correct answers are Option 2 and Option 3 i.e., RMS Energy extraction is a time domain feature and RMS Energy extraction feature involves the root mean square computation of the amplitude values of the audio samples"
    },
    {
      question: "What does Zero Crossing rate refer to in the case of an audio signal?",
      options: ["Number of times the audio signal crosses the horizontal axis (time axis)", "Double the number of times the audio signal crosses the horizontal axis (time axis)", "Half the number of times the audio signal crosses the horizontal axis (time axis)", "None of the above"],
      answer: [0],
      explanation: "Correct answer is Option 1 i.e., Number of times the audio signal crosses the horizontal axis (time axis)"
    },
    {
      question: "Which of the following statements are true?",
      options: ["RMS Energy feature is an indicator of pitch", "RMS Energy feature is an indicator of timbre", "RMS Energy feature is an indicator of loudness", "RMS Energy feature is an indicator of frequency"],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., RMS Energy feature is an indicator of loudness"
    },
    {
      question: "Which of the function is involved in the computation of Zero Crossing rate features of an audio?",
      options: ["Absolute Function", "Exponential Function", "Signum Function", "Hyperbolic Function"],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., Signum Function"
    },
    {
      question: "What is the unit of loudness level for pure tone?",
      options: ["Decibel", "Velocity", "Phon", "Wavelength"],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., Phon"
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
