import React, { useState } from 'react';
import axios from 'axios';
import image from '../../image.png';
import Quiz from './Pretest';

const RMS = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputs, setInputs] = useState([
    { id: 'lambda', label: 'Forgetting factor', min: 0, max: 1, step: 0.001, value: 0.5 },
    { id: 'M', label: 'Filter length', min: 2, max: 50, step: 1, value: 5 }
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
function rls_denoise(lambda, inputFile, M, outputDir)
    delta = 1e-3;
    fs = 100;
    clc;
    close all;
    x = csvread(inputFile);
    n = length(x);
    P = (1 / delta) * eye(M);
    w_rls = zeros(M, 1);
    D = x;
    A = D + 0.5 * randn(size(D));
    B_rls = zeros(1, n);
    Err_rls = zeros(1, n);
    weights_rls = zeros(M, n);
    A_padded = [zeros(M-1, 1); A];
    t = (0:n-1) / fs;
    for i = M:n
        A_i = A_padded(i:-1:i-M+1);
        k = (P * A_i) / (lambda + A_i' * P * A_i);
        y_rls = w_rls' * A_i;
        Err_rls(i) = D(i) - y_rls;
        w_rls = w_rls + k * Err_rls(i);
        weights_rls(:, i) = w_rls;
        P = (P - k * A_i' * P) / lambda;
        if any(diag(P) < 1e-10)
            P = max(P, 1e-10 * eye(M));
        end
        B_rls(i) = w_rls' * A_i;
    end
    figure;
    subplot(3,1,1), plot(t, D);
    title('Desired Signal');
    xlabel('Time (s)');
    ylabel('Amplitude');
    subplot(3,1,2), plot(t, A);
    title('Signal Corrupted with Noise');
    xlabel('Time (s)');
    ylabel('Amplitude');
    subplot(3,1,3), plot(t, B_rls);
    title('RLS Output Signal');
    xlabel('Time (s)');
    ylabel('Amplitude');
    legend('RLS Output');
    saveas(gcf, fullfile(outputDir, 'rls_output_signal.png'));
    figure;
    subplot(2,1,1), plot(t, Err_rls);
    title('RLS Error Signal');
    xlabel('Time (s)');
    ylabel('Error');
    saveas(gcf, fullfile(outputDir, 'rls_error_signal.png'));
end
`;
    setCode(generatedCode);
    setCodeHtml(`<pre>${generatedCode}</pre>`);
  };

  const handleDownloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "rls_denoise.m";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleSubmitAndRun = () => {
  const formData = new FormData();
  formData.append('file', selectedFile);
  formData.append('lambda', inputs.find(input => input.id === 'lambda').value);
  formData.append('M', inputs.find(input => input.id === 'M').value);

  axios.post('http://localhost:5000/process', formData)
    .then(response => {
      setImageUrls(response.data.images.map(imageUrl => URL.createObjectURL(imageUrl)));
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
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
            <button onClick={handleDownloadCode} className="bg-blue-button rounded-lg px-3 py-1 hover:bg-blue-hover mt-10">
              Download
            </button>
            <button onClick={handleSubmitAndRun} className="bg-blue-button rounded-lg px-3 py-1 hover:bg-blue-hover mt-10">
              Submit & Run
            </button>
          </div>
        </div>
        <div className="text-sm">
          <div className="flex flex-col">
            <p className="mb-2 ml-12">Select CSV file of Input</p>
            <input type="file" onChange={handleFileChange}
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
                      <span>{input.min} ≤ </span> {input.label} <span> ≤ {input.max}</span>
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
                      className="flex-grow ml-2"
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
        <div className='flex flex-row space-x-8'>
          {imageUrls.slice(0, 2).map((url, index) => (
            <iframe key={index} src={url} title={`Embedded Content ${index}`} width="400" height="250"></iframe>
          ))}
        </div>
        <div className='flex flex-row space-x-5'>
          {imageUrls.slice(2, 4).map((url, index) => (
            <iframe key={index} src={url} title={`Embedded Content ${index}`} width="400" height="250"></iframe>
          ))}
        </div>
        <div>
          {imageUrls.slice(4, 5).map((url, index) => (
            <iframe key={index} src={url} title={`Embedded Content ${index}`} width="400" height="250"></iframe>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RMS;
