import React, { useState } from 'react';
import axios from 'axios';
import image from '../../image.png';

const LMSPrediction = () => {
  const fileOptions = [
    { name: 'Arabian Mystery (Mic Recording)', file: 'arabian_mystery.wav' },
    { name: 'Christmas Tune (Studio)', file: 'christmas.wav' },
    { name: 'Drum Roll (Noisy Room)', file: 'drum roll.wav' },
    { name: 'Echo Effect (Mic Recording)', file: 'echo.wav' },
    { name: 'Guitar Solo (Studio)', file: 'guitar.wav' },
    { name: 'Indian Flute (Noisy Room)', file: 'indian flute.wav' },
    { name: 'Melodical Flute (Mic Recording)', file: 'melodical flute.wav' },
    { name: 'Noise Sample (Studio)', file: 'noise.wav' },
    { name: 'Piano Melody (Noisy Room)', file: 'piano.wav' },
    { name: 'Trumpet Blast (Mic Recording)', file: 'trumpet.wav' },
    { name: 'Voice Recording (Studio)', file: 'voice.wav' },
    { name: 'Violin Solo (Noisy Room)', file: 'voilin.wav' },
    { name: 'Violin Jingle (Noisy Room)', file: 'voilin jingle.wav' }
  ];

  const [selectedFile, setSelectedFile] = useState(fileOptions[0].file);
  const [selectedFeature, setSelectedFeature] = useState('MAX');
  const [inputs, setInputs] = useState([
    { id: 'sampling_rate', label: 'Sampling Rate (Hz)', min: 1000, max: 40000, step: 1000, value: 16000 },
    { id: 'num_samples', label: 'No.of samples', min: 1, max: 20000, step: 1, value: 1024 },
    { id: 'start_sample', label: 'Starting sample', min: 1, max: 10000, step: 1, value: 512 }
  ]);

  const [code, setCode] = useState('');
  const [codeHtml, setCodeHtml] = useState('Code will be generated here.!');
  const [imageUrls, setImageUrls] = useState(new Array(5).fill(image));
  const [loading, setLoading] = useState(false);
  const [showImages, setShowImages] = useState(false);

  const handleFileChange = (file) => setSelectedFile(file);

  const handleInputChange = (id, value) => {
    const newValue = Math.min(Math.max(Number(value), inputs.find(input => input.id === id).min), inputs.find(input => input.id === id).max);
    setInputs(inputs.map(input => input.id === id ? { ...input, value: newValue } : input));
  };

  const handleGenerateCode = () => {
    const generatedCode = `
import argparse
import librosa
import numpy as np
import scipy as sp
import AMPPHASE_PLOT  # your plotting module
import os


if __name__ == "__main__":

    parser = argparse.ArgumentParser(description='Process audio file and plot amplitude & phase spectrum.')
    parser.add_argument('--file', type=str, required=True, help='Audio file name (in input/ folder)')
    parser.add_argument('--sampling-rate', type=int, required=True, help='Sampling rate to load the audio')
    parser.add_argument('--start-sample', type=int, required=True, help='Starting sample number for display')
    parser.add_argument('--num-samples', type=int, required=True, help='Number of samples to display (max 20000)')
    parser.add_argument('--unique-id', type=str, required=True, help='Unique identifier for output file')

    args = parser.parse_args()

    # Paths
    input_file = os.path.join('inputs' \
    '', args.file)

    print(f"\nAudio file selected is :: {args.file}")

    input_audio, sr = librosa.load(input_file, sr=args.sampling_rate)

    sample_duration = 1 / sr
    tot_samples = len(input_audio)

    print(f"\nSampling Rate used for the audio file {args.file} :: {sr}")
    print(f"One sample lasts for {sample_duration:6f} seconds")
    print(f"Total number of samples in the audio file is::{tot_samples}")
    print(f"Audio duration is::{tot_samples * sample_duration:4.2f} seconds")

    st_idx = args.start_sample
    N_Samples = args.num_samples

    ft = sp.fft.fft(input_audio)

    magnitude = np.absolute(ft)
    frequency = np.linspace(0, sr, len(magnitude))

    phase = np.angle(ft, deg=True)

    STR_FIGNAME = ['AMP_SPECTRUM', 'PHASE_SPECTRUM']

    AMPPHASE_PLOT.PLOTSPECTRUM(
        input_audio=input_audio,
        sampling_rate=sr,
        frequency=frequency,
        magnitude=magnitude,
        phase=phase,
        audfile_name=args.file,
        FIG_NAME=STR_FIGNAME,
        output_path='outputs',
        uniqueIdentifier=args.unique_id,
        sampidx=st_idx,
        NSAMPLES=N_Samples
    )

    print('\nOperation completed')
`.trim();
    setCode(generatedCode);
    setCodeHtml(`<pre>${generatedCode}</pre>`);
  };

  

  const handleRun = async () => {
    setLoading(true);
    setShowImages(false);
    const data = {
      audioPath: selectedFile,
      start_sample:inputs.find(input => input.id === 'start_sample').value,
      num_samples:inputs.find(input => input.id === 'num_samples').value,
      sr:inputs.find(input => input.id === 'sampling_rate').value,
    };

    try {
      const response = await axios.post('http://localhost:5000/exp3', data,{
      headers: {
        // 'Content-Type': 'multipart/form-data'
      }
    });
      console.log("Backend response:", response.data);
      setImageUrls(response.data.images.map(img => `http://localhost:5000${img}`));
    setShowImages(true);
    } catch (error) {
      console.error('Error running the script:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exp3.py";
    a.click();
  };

  const SphereLoading = () => (
    <div className="flex fixed inset-0 items-center justify-center bg-white bg-opacity-50">
      <div className="text-sm font-bold">Loading...</div>
    </div>
  );

  return (
    <div className='flex flex-row gap-5 justify-between space-x-5'>
      <div className="flex flex-col  space-y-10">
        <div className='flex flex-col'>
          <iframe
            srcDoc={codeHtml}
            title="Generated Code"
            width="780"
            height="300"
            className='outline border-4 p-2 rounded-sm border-blue-hover'
          ></iframe>
          <div className='flex justify-between'>
            <button className="bg-blue-button rounded-lg px-3 py-1 hover:bg-blue-hover mt-8" onClick={handleDownload}>
              Download
            </button>
            <button className="bg-blue-button rounded-lg px-3 py-1 hover:bg-blue-hover mt-8" onClick={handleRun}>
              Submit & Run
            </button>
          </div>
        </div>
      {loading && <SphereLoading />}
      {!loading && showImages && (
        <div className='flex flex-col items-center mt-5'>
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Output ${index + 1}`} className="rounded shadow" />
          ))}
        </div>
      )}
        
      </div>
      <div className="text-sm">
          <div className="flex flex-col">
            <p className="mb-2 ml-12 font-bold">Select Audio File (.wav)</p>
            <select
              onChange={(e) => handleFileChange(e.target.value)}
              value={selectedFile}
              className="bg-white border border-black rounded-lg px-3 py-1 focus:outline-none"
            >
              {fileOptions.map((option, index) => (
                <option key={index} value={option.file}>{option.name}</option>
              ))}
            </select>
          </div>

          <div className='flex flex-col mt-8 items-center'>
            <p className='font-bold'>Select the Input Parameters</p>
            <div className='bg-blue-hover px-5 py-3 mt-2 rounded-xl'>
              {inputs.map(input => (
                <div key={input.id} className="flex flex-col items-center mb-4">
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
                      className="w-16 text-center border border-gray-300 rounded-lg py-1 focus:outline-none"
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
            <button onClick={handleGenerateCode} className="bg-blue-button rounded-lg px-3 py-1 hover:bg-blue-hover mt-10 text-base">
              Generate Code
            </button>
          </div>
        </div>
      
    </div>
  );
};

export default LMSPrediction;
