import React, { useState } from 'react';
import axios from 'axios';
import image from '../../image.png';

const LMS = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputs, setInputs] = useState([
    { id: 'step-size', label: 'Step-size', min: 0, max: 1, step: 0.001, value: 0.5 },
    { id: 'order', label: 'Order of Filter (M)', min: 2, max: 100, step: 1, value: 50 }
  ]);

  const [code, setCode] = useState('');
  const [codeHtml, setCodeHtml] = useState('');
  const [imageUrls, setImageUrls] = useState(new Array(5).fill(image));

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleInputChange = (id, value) => {
    const input = inputs.find(input => input.id === id);
    const newValue = Math.min(Math.max(value, input.min), input.max);
    setInputs(inputs.map(input => input.id === id ? { ...input, value: newValue } : input));
  };

  const handleGenerateCode = () => {
    const generatedCode = `
function lms_denoise(mu, inputFile, order)
    % Function to apply LMS denoising to an EEG signal
    %
    % Parameters:
    %   mu: Learning rate for LMS
    %   inputFile: Name of the input .csv file containing the EEG signal
    %   order: Order of the LMS filter

    % Default values for delta and fs
    experiment = 100;  % Number of experiments for averaging

    % Clear and close all previous states
    clc;
    close all;

    % Load the EEG signal from the input file
    x = csvread(inputFile)';
    
    % Check the length of the signal
    iteration = length(x);

    % Initialize optimal weight vector
    w_opt = [0.1, 0.4, 0.4, 0.1]'; % Adjust size according to \`order\`

    % Initialize vectors to store the weights and the mean square deviation (MSD)
    MSD_LMS_main = zeros(iteration, 1); % Mean square deviation (MSD)
    w_LMS_main = zeros(order, 1);

    % Generate the signal corrupted with noise
    A = x + 0.5 * randn(1, iteration); % Simulated noisy signal

    for i = 1:experiment
        % Initialize adaptive filter coefficients and input vector
        w_LMS = zeros(order, 1);
        An = zeros(order, 1);
        MSD_LMS = zeros(iteration, 1);

        % Apply the LMS algorithm
        for n = 1:iteration
            An = [A(n); An(1:end-1)]; % Input regressor vector

            % Update the filter coefficients
            e_LMS = x(n) - An' * w_LMS;
            w_LMS = w_LMS + mu * e_LMS * An;

            % Store the MSD
            MSD_LMS(n) = norm(w_LMS - w_opt, 2)^2;
        end

        MSD_LMS_main = MSD_LMS_main + MSD_LMS;
        w_LMS_main = w_LMS_main + w_LMS;
    end

    MSD_LMS_main = MSD_LMS_main / experiment;
    w_LMS_main = w_LMS_main / experiment;

    % Estimate the output signal
    estimated_output_signal = zeros(iteration, 1);
    for n = 1:iteration
        An = [A(n); An(1:end-1)]; % Input regressor vector
        estimated_output_signal(n) = An' * w_LMS_main;
        e_LMS(n) = x(n) - An' * w_LMS_main;
    end

    % Display the signals
    figure;
    subplot(5, 1, 1), plot(x);
    title('Desired Signal');

    subplot(5, 1, 2), plot(A);
    title('Signal Corrupted with Noise');

    subplot(5, 1, 3), plot(estimated_output_signal);
    legend('LMS Output');
    title('Adaptive Filter Outputs');

    subplot(5, 1, 4), plot(e_LMS);
    title('LMS Error Signal');

    subplot(5, 1, 5), plot(10 * log10(MSD_LMS_main));
    title('MSD (dB)');
end
    `;
    setCode(generatedCode);
    setCodeHtml(`<pre>${generatedCode}</pre>`);
  };

  const handleRun = async () => {
  const formData = new FormData();
  formData.append('file', selectedFile);
  formData.append('lambda', inputs.find(input => input.id === 'step-size').value);
  formData.append('M', inputs.find(input => input.id === 'order').value);

  try {
    const response = await axios.post('http://localhost:5000/process', formData);
    setImageUrls(response.data.images.map(img => `http://localhost:5000${img}`));
  } catch (error) {
    console.error('Error running the script:', error);
  }
};

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "lms_denoise.m";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className='flex flex-col space-y-10'>
      <div className="flex flex-row gap-5 space-x-5"> 
        <div className='flex flex-col'>
          <iframe
            srcDoc={codeHtml}
            title="Generated Code"
            width="600"
            height="262"
          ></iframe>
          <div className='flex justify-between text-sm'>
            <button 
              className="bg-blue-button rounded-lg px-3 py-1 hover:bg-blue-hover mt-10"
              onClick={handleDownload}
            >
              Download
            </button>
            <button 
              className="bg-blue-button rounded-lg px-3 py-1 hover:bg-blue-hover mt-10"
              onClick={handleRun}
            >
              Submit & Run
            </button>
          </div>
        </div>
        <div className="text-sm">
          <div className="flex flex-col">
            <p className="mb-2 ml-12 ">Select CSV file of Input</p>
            <input
              type="file"
              onChange={handleFileChange}
              className="bg-white border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className='flex flex-col mt-8 items-center'>
            Select the input Parameters
            <div className='bg-blue-hover px-5 py-3 mt-2 rounded-xl'>
              {inputs.map(input => (
                <div key={input.id} className="flex flex-col items-center">
                  <label htmlFor={input.id} className="block mb-2">
                    <pre className='font-serif'>
                      <span>{input.min} ≤ </span> {input.label} <span> ≤  {input.max} </span>
                    </pre>
                  </label>
                  <div className="flex flex-row items-center">
                    <input
                      type="number"
                      id={input.id}
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      value={input.value}
                      onChange={(e) => handleInputChange(input.id, e.target.value)}
                      className="w-16 text-center border border-gray-300 rounded-lg py-1 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="range"
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      value={input.value}
                      onChange={(e) => handleInputChange(input.id, e.target.value)}
                      className="flex-grow ml-2 "
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <button onClick={handleGenerateCode} className="bg-blue-button rounded-lg px-3 py-1 hover:bg-blue-hover mt-10">
              Generate Code
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2 items-center'>
        <div className='flex flex-row space-x-5'>
          <iframe
            src={imageUrls[0]}
            title="Output Image 1"
            width="400"
            height="250"
          ></iframe>
          <iframe
            src={imageUrls[1]}
            title="Output Image 2"
            width="400"
            height="250"
          ></iframe>
        </div>
        <div className='flex flex-row space-x-5'>
          <iframe
            src={imageUrls[2]}
            title="Output Image 3"
            width="400"
            height="250"
          ></iframe>
          <iframe
            src={imageUrls[3]}
            title="Output Image 4"
            width="400"
            height="250"
          ></iframe>
        </div>
        <div>
          <iframe
            src={imageUrls[4]}
            title="Output Image 5"
            width="500"
            height="250"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default LMS;
