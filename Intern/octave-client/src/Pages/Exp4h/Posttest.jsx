import React, { useState } from 'react';

const Quiz = () => {
  const questions = [
    {
      question: "Which function in Librosa is used to compute spectral centroid?",
      options: ["librosa.feature.mfcc()", "librosa.feature.spectral_centroid()", "librosa.feature.melspectrogram()", "librosa.stft()"],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., librosa.feature.spectral_centroid()"
    },
    {
      question: "What does a high spectral centroid indicate in an audio file?",
      options: ["The presence of more low-frequency components", "A dull or bass-heavy sound", "A brighter or sharper sound", "A longer audio duration"],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., A brighter or sharper sound"
    },
    {
      question: "What happens to the spectral bandwidth if an audio signal has a wide frequency range?",
      options: ["It decreases", "It remains constant", "It increases", "It turns negative"],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., It increases"
    },
    {
      question: "Which mathematical operation is applied to calculate spectral bandwidth?",
      options: ["Standard deviation of frequency components", "Summation of amplitude values", "Logarithmic transformation", "Wavelet transform"],
      answer: [0],
      explanation: "Correct answer is Option 1 i.e., Standard deviation of frequency components"
    },
    {
      question: "Why is spectral centroid an important feature in music classification?",
      options: ["It helps distinguish between high-pitched and low-pitched sounds", "It measures the tempo of the audio", "It identifies the lyrics in a song", "It calculates the total duration of the track"],
      answer: [0],
      explanation: "Correct answer is Option 1 i.e., It helps distinguish between high-pitched and low-pitched sounds"
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
