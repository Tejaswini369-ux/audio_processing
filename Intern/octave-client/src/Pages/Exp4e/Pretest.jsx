import React, { useState } from 'react';

const Quiz = () => {
  const questions = [
    {
      question: "What is a MEL spectrogram?",
      options: ["A time-frequency representation of audio using the MEL scale", "A waveform representation of an audio signal", "A method for video compression", "A technique for noise cancellation"],
      answer: [0],
      explanation: "Correct answer is Option 1 i.e., A time-frequency representation of audio using the MEL scale"
    },
    {
      question: "Why is the MEL scale used in audio processing?",
      options: ["To enhance image resolution", "To mimic human perception of sound frequencies", "To remove background noise", "To increase the sampling rate"],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., To mimic human perception of sound frequencies"
    },
    {
      question: "Which library is commonly used in Python to extract MEL spectrograms?",
      options: ["OpenCV", "Librosa", "Pandas", "NumPy"],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., Librosa"
    },
    {
      question: "What is the key difference between a spectrogram and a MEL spectrogram?",
      options: ["MEL spectrograms use linear frequency scaling", "MEL spectrograms convert frequencies to a perceptual scale", "Spectrograms use deep learning models", "There is no difference"],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., MEL spectrograms convert frequencies to a perceptual scale"
    },
    {
      question: "Which parameter is NOT required when generating a MEL spectrogram?",
      options: ["Sampling rate", "Window size", "Frame rate", "Number of MEL bands"],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., Frame rate"
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
