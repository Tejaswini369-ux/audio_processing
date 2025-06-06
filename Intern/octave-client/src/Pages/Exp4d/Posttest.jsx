import React, { useState } from 'react';

const Quiz = () => {
  const questions = [
    {
      question: "Which type of transform is most commonly used in the computation of spectrograms in the case of an audio signal?",
      options: ["Fast Fourier Transform", "Continuous Time Fourier Transform", "Discrete Time Four Transform", "Short Time Fourier Transform"],
      answer: [0,3],
      explanation: "Correct answers are Option 1 and Option 4 i.e., Fast Fourier Transform and Short Time Fourier Transform"
    },
    {
      question: "What are the applications of Short Time Fourier Transform while referring to an audio signal? ",
      options: ["Noise reduction","Pitch detection","Pitch shifting","All of the above"],
      answer: [3],
      explanation: "Correct answer is Option 4 i.e., All of the above"
    },
    {
      question: "Which of the following statements are true while referring to an audio signal?",
      options: ["Discrete Fourier Transform has temporal resolution", "Short Time Fourier Transform provides both temporal and frequency resolution", "Discrete Fourier Transform has no temporal resolution", "Short Time Fourier Transform does not provide both temporal and frequency resolution"],
      answer: [1,2],
      explanation: "Correct answers are Option 2 and Option 3 i.e., Short Time Fourier Transform provides both temporal and frequency resolution and Discrete Fourier Transform has no temporal resolution"
    },
    {
      question: "Which of the following statements are true?",
      options: ["STFT does not uses the concept of framing and windowing", "STFT uses the concept of framing but not windowing", "STFT uses the concept of both framing and windowing", "STFT uses the concept of windowing but not framing."],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., STFT uses the concept of both framing and windowing"
    },
    {
      question: "Select the correct statements in the case of Short Time Fourier Transform (STFT) while referring to an audio signal.",
      options: ["During the computation of STFT frame size must always be equal to the window size.", "During the computation of STFT frame size must not be equal to the window size.", "During the computation of STFT the concepts of frame size and window size is not involved.", "During the computation of STFT frame size may or may not be equal to the window size."],
      answer: [3],
      explanation: "Correct answer is Option 4 i.e., During the computation of STFT frame size may or may not be equal to the window size."
    },
    {
      question: "What is the relationship of frequency bins to frame size in the case of an audio signal?",
      options: ["Frequency bins is equal to one less than half the frame size.", "Frequency bins is equal to half the frame size.", "Frequency bins is equal to four times the frame size.", "Frequency bins is equal to one more than half the frame size."],
      answer: [3],
      explanation: "Correct answer is Option 4 i.e., Frequency bins is equal to one more than half the frame size."
    },
    {
      question: "Which type of transform is most commonly used in the computation of spectrograms in the case of an audio signal?",
      options: ["Complex Fourier Coefficients", "Spectral vector composing of the number of frequency bins.", "Spectral matrix of the size of number of frequency bins by the number of frames.", "None of the above"],
      answer: [0,2],
      explanation: "Correct answers are Option 1 and Option 3 i.e., Complex Fourier Coefficients and Spectral matrix of the size of number of frequency bins by the number of frames."
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
