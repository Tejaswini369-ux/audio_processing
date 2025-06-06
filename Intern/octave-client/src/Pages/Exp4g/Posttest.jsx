import React, { useState } from 'react';

const Quiz = () => {
  const questions = [
    {
      question: "Which function in Python is commonly used to compute the Short-Time Fourier Transform (STFT) for BER calculation?",
      options: ["librosa. feature. melspectrogram()", "scipy. signal. stft()", "numpy.fft.fft()", "matplotlib.pyplot.specgram()"],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., scipy. signal. stft()"
    },
    {
      question: "What happens to the Band Energy Ratio if the low-frequency components of a signal have higher energy?",
      options: ["The ratio increases in the lower bands", "The ratio remains constant", "The ratio increases in the higher bands", "The ratio becomes negative"],
      answer: [0],
      explanation: "Correct answer is Option 1 i.e., The ratio increases in the lower bands"
    },
    {
      question: "Why is it useful to analyze Band Energy Ratio in speech signals?",
      options: ["To detect emotional variations and speaker characteristics", "To enhance the amplitude of the signal", "To increase the sampling rate of the audio", "To filter out background noise"],
      answer: [0],
      explanation: "Correct answer is Option 1 i.e., To detect emotional variations and speaker characteristics"
    },
    {
      question: "Which mathematical operation is used to obtain the energy in a specific frequency band?",
      options: ["Squaring the amplitude values and summing them", "Taking the logarithm of the signal", "Applying the inverse Fourier transform", "Computing the phase spectrum"],
      answer: [0],
      explanation: "Correct answer is Option 1 i.e., Squaring the amplitude values and summing them"
    },
    {
      question: "In which of the following fields is Band Energy Ratio analysis widely applied?",
      options: ["Speech and audio classification", "Image processing", "Video rendering", "Text summarization"],
      answer: [0],
      explanation: "Correct answer is Option 1 i.e., Speech and audio classification"
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
