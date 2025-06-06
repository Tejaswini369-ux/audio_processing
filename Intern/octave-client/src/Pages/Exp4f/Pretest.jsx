import React, { useState } from 'react';

const Quiz = () => {
  const questions = [
    {
      question: "What does MFCC stand for?",
      options: ["Mel-Frequency Cepstral Classification", "Mel-Frequency Cepstral Coefficients", "Modified Fourier Cepstral Coefficients","Multi-Frequency Cepstral Coefficients"],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., Mel-Frequency Cepstral Coefficients"
    },
    {
      question: "Why is the Mel scale used in MFCC extraction?",
      options: ["To enhance image resolution", "To compress the audio file", "To mimic human auditory perception ", "To remove background noise"],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., To mimic human auditory perception "
    },
    {
      question: "Which of the following is a key step in MFCC extraction?",
      options: ["Converting frequency to log scale", "Applying Discrete Cosine Transform (DCT)", "Using a Mel filter bank", "All of the above"],
      answer: [3],
      explanation: "Correct answer is Option 4 i.e., All of the above"
    },
    {
      question: "Which mathematical transform is used to extract MFCCs after applying the Mel filter bank?",
      options: ["Fast Fourier Transform (FFT)", "Inverse Fourier Transform", "Discrete Cosine Transform (DCT)", "Wavelet Transform"],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., Discrete Cosine Transform (DCT)"
    },
    {
      question: "Which feature of audio signals does MFCC primarily focus on?",
      options: ["Time-domain characteristics", "Short-term frequency content", "Pitch and timbre", "Phase information"],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., Short-term frequency content"
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
