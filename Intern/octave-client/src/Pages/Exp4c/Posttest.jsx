import React, { useState } from 'react';

const Quiz = () => {
  const questions = [
    {
      question: "What does high magnitude indicate in the amplitude spectrum plot of audio?",
      options: ["High Magnitude indicate low similarity between the audio signal and the sinusoid.", "High Magnitude indicate zero similarity between the audio signal and the sinusoid.", "High Magnitude indicate high similarity between the audio signal and the sinusoid.", "None of the above"],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., High Magnitude indicate high similarity between the audio signal and the sinusoid."
    },
    {
      question: "What does low magnitude indicate in the amplitude spectrum plot of audio?",
      options: ["Low Magnitude indicate zero similarity between the audio signal and the sinusoid.", "Low Magnitude indicate low similarity between the audio signal and the sinusoid.", "Low Magnitude indicate high similarity between the audio signal and the sinusoid.", "None of the above"],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., Low Magnitude indicate low similarity between the audio signal and the sinusoid."
    },
    {
      question: "What of the following statements is correct related to phase spectrum of an audio signal?",
      options: ["The phase spectrum of a signal is a measure of the relative phase difference between the same frequency components of the signal.", "The phase spectrum of a signal is a measure of the relative phase difference between the different frequency components of the signal.", "The phase spectrum is used to analyze and understand the amplitude relationships between different frequency components in a signal.", "The phase spectrum is used to analyze and understand the phase relationships between different frequency components in a signal."],
      answer: [1,3],
      explanation: "Correct answers are Option 2 and Option 4 i.e., The phase spectrum of a signal is a measure of the relative phase difference between the different frequency components of the signal. and The phase spectrum is used to analyze and understand the phase relationships between different frequency components in a signal."
    },
    {
      question: "Which of the following statements are true?",
      options: ["A complex speech signal can be broken down into its real and imaginary parts.", "A complex speech signal cannot be broken down into its real and imaginary parts.", "Phase spectrum is the angle of the real part with respect to the imaginary part.", "Phase spectrum is the angle of the imaginary part with respect to the real part."],
      answer: [0,3],
      explanation: "Correct answers are Option 1 and Option 4 i.e., A complex speech signal can be broken down into its real and imaginary parts. and Phase spectrum is the angle of the imaginary part with respect to the real part."
    },
    {
      question: "Which of the following statements are true?",
      options: ["The phase spectrum can be represented graphically as a plot of frequency vs the phase angle.", "The phase spectrum can be represented graphically as a plot of phase angle versus frequency.", "The phase spectrum can be represented graphically as a plot of frequency vs the time.", "The phase spectrum can be represented graphically as a plot of phase angle vs the time."],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., The phase spectrum can be represented graphically as a plot of phase angle versus frequency."
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
