import React, { useState } from 'react';

const Quiz = () => {
  const questions = [
    {
      question: "What do you mean by spectrogram in the case of an audio signal?",
      options: ["A spectrogram is a visual representation of the spectrum of amplitudes of a signal as it varies with time.", "A spectrogram is a visual representation of the spectrum of frequencies of a signal as it varies with frequency.", "A spectrogram is a visual representation of the spectrum of frequencies of a signal as it varies with time.", "A spectrogram is a visual representation of the spectrum of amplitudes of a signal as it varies with frequency."],
      answer: [2],
      explanation: "Correct answer is Option 3 i.e., A spectrogram is a visual representation of the spectrum of frequencies of a signal as it varies with time."
    },
    {
      question: "What is another name of spectrogram in the case of an audio signal?",
      options: ["Sonographs", "Voiceprints", "Voicegrams", "All of the above"],
      answer: [3],
      explanation: "Correct answer is Option 4 i.e., All of the above"
    },
    {
      question: "What is spectrogram in audio?",
      options: ["A spectrogram is a graphic representation of audio signals, demonstrating the frequency of the audio of a signal over a specific time interval.", "A spectrogram is a graphic representation of audio signals, demonstrating the amplitude of the audio of a signal over a specific time interval.", "None of the Above", "Both (a) and (b)"],
      answer: [1],
      explanation: "Correct answer is Option 2 i.e., A spectrogram is a graphic representation of audio signals, demonstrating the amplitude of the audio of a signal over a specific time interval."
    },
    {
      question: "Which does spectrogram represent in the case of an audio in the single graph?",
      options: ["Time", "Frequency", "Amplitude", "All of the above"],
      answer: [3],
      explanation: "Correct answer is Option 4 i.e., All of the above"
    },
    {
      question: "Which of the following statements are true?",
      options: ["Spectrograms are visual representations of audio – representing time, frequency, and amplitude all in different graphs.", "Spectrograms are visual representations of audio – representing time and frequency in one graph and amplitude in a different graph.", "Spectrograms are visual representations of audio – representing time and amplitude in one graph and frequency in a different graph.", "Spectrograms are visual representations of audio – representing time, frequency, and amplitude all on one graph."],
      answer: [3],
      explanation: "Correct answer is Option 4 i.e., Spectrograms are visual representations of audio – representing time, frequency, and amplitude all on one graph."
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
