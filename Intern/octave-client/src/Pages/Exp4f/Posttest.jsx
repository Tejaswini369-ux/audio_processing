import React, { useState } from 'react';

const Quiz = () => {
  const questions = [
    {
      question: "Which of the following has the highest Zero Crossing rate feature?",
      options: ["Violin Sound", "Piano Sound", "Human Voice", "Noisy Signals"],
      answer: [3],
      explanation: "Correct answer is Option 4 i.e., Noisy Signals"
    },
    {
      question: "Which of the following statements are true?",
      options: ["RMS Energy Feature for an audio frame takes the sample with the maximum amplitude in given frame", "RMS Energy Feature for an audio frame takes the sample with the minimum amplitude in given frame", "RMS Energy Feature for an audio frame takes all samples in given frame", "All of the above"],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., RMS Energy Feature for an audio frame takes all samples in given frame"
    },
    {
      question: "In order to measure the smoothness of the audio signal which time domain audio feature is used.",
      options: ["Amplitude Envelope", "Root Mean Square Energy", "Zero Crossing Rate", "All of the above"],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., Zero Crossing Rate"
    },
    {
      question: "Which of the following statements related to Zero Crossing Rate feature are true for an audio signal?",
      options: ["Calculation of the zero-crossing rate of an audio signal does not involve the comparison of the sign of amplitude values of each pair of consecutive samples.", "Calculation of the zero-crossing rate of an audio signal involves the comparison of the sign of amplitude values of each pair of consecutive odd samples.", "Calculation of the zero-crossing rate of an audio signal involves the comparison of the sign of amplitude values of each pair of consecutive samples.", "Calculation of the zero-crossing rate of an audio signal involves the comparison of the sign of amplitude values of each pair of consecutive even samples."],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., Calculation of the zero-crossing rate of an audio signal involves the comparison of the sign of amplitude values of each pair of consecutive samples."
    },
    {
      question: "Which feature is useful for audio segmentation and music genre classification?",
      options: ["Zero Crossing Rate", "Amplitude Envelope", "Root Mean Square Energy", "All of the above"],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., Root Mean Square Energy"
    },
    {
      question: "Select the audio features that works on the concept of framing.",
      options: ["Zero Crossing Rate", "Amplitude Envelope", "Root Mean Square Energy", "All of the above"],
      answer: [3],
      explanation: "Correct answer is Option 4 i.e., All of the above"
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
