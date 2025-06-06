import React, { useState } from 'react';

const Quiz = () => {
  const questions = [
    {
      question: "What does Band Energy Ratio (BER) measure in an audio signal?",
      options: ["The total duration of the audio signal", "The distribution of energy across different frequency bands", "The pitch of the sound","The loudness of the audio"],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., The distribution of energy across different frequency bands "
    },
    {
      question: "Which of the following is necessary to compute Band Energy Ratio?",
      options: ["Short-Time Fourier Transform (STFT) ", "Auto-correlation", "Wavelet Transform", "Linear Regression"],
      answer: [0],
      explanation: "Correct answer is Option 1 i.e., Short-Time Fourier Transform (STFT) "
    },
    {
      question: "How is the Band Energy Ratio (BER) calculated?",
      options: ["By dividing the total energy by the number of samples", "By computing the ratio of energy in a specific frequency band to the total energy", "By applying an inverse Fourier Transform", "By using a moving average filter"],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., By computing the ratio of energy in a specific frequency band to the total energy"
    },
    {
      question: "Which of the following applications commonly use Band Energy Ratio analysis?",
      options: ["Image segmentation", "Speech emotion recognition", "Text-to-speech conversion", "Video compression"],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., Speech emotion recognition"
    },
    {
      question: "What is the main advantage of using Band Energy Ratio in audio analysis?",
      options: ["It reduces noise in the signal", "It provides frequency-specific energy distribution", "It enhances pitch detection", "It increases the speed of audio playback"],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., It provides frequency-specific energy distribution"
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
