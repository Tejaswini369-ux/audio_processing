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
    { id: 'sampling-rate', label: 'Sampling Rate (Hz)', min: 1000, max: 40000, step: 1000, value: 16000 },
    { id: 'nmfcc', label: 'the Number of MFCC values', min: 1, max: 20, step: 1, value: 10 },
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

import librosa
import librosa.display
import matplotlib.pyplot as plt
import os

def plot_spectrogram(Y, deltaY, deltaY1, deltaMFCCS_concat, sr, audfile_name, fig_name,
                     x_axis="s", output_path='outputs', uniqueIdentifier='default'):
    # Ensure output path exists
    os.makedirs(output_path, exist_ok=True)

    # Setup plot
    plt.figure(figsize=(25, 15))
    plt.rcParams.update({'font.size': 22})

    titles = [
        f"{audfile_name}_{fig_name[0]}",
        f"{audfile_name}_{fig_name[1]}",
        f"{audfile_name}_{fig_name[2]}",
        f"{audfile_name}_{fig_name[3]}"
    ]

    specs = [Y, deltaY, deltaY1, deltaMFCCS_concat]

    for i in range(4):
        plt.subplot(2, 2, i+1)
        librosa.display.specshow(specs[i], sr=sr, x_axis=x_axis)
        plt.colorbar(format="%+2.f")
        plt.title(titles[i])
        plt.ylabel('Index')

    plt.tight_layout()

    # Save with unique identifier
    output_file = os.path.join(output_path, f"Delta_MFCCS_Features_{uniqueIdentifier}.jpg")
    plt.savefig(output_file)
    plt.close()


import librosa
import numpy as np
import argparse
import os
import spectplots

def compute_and_plot_mfcc_features(input_file, sr_user, n_mfcc, unique_id, output_dir='outputs'):
    os.makedirs(output_dir, exist_ok=True)
    audfile_name = os.path.basename(input_file)

    # Load audio
    input_audio, sr = librosa.load(input_file, sr=sr_user)
    sample_duration = 1 / sr
    tot_samples = len(input_audio)

    print(f"\nAudio file selected is :: {audfile_name}")
    print(f"Sampling Rate used :: {sr}")
    print(f"Frame duration :: {sample_duration:6f} seconds")
    print(f"Total samples :: {tot_samples}")
    print(f"Total audio duration :: {tot_samples * sample_duration:4.2f} seconds")

    # Compute MFCCs and deltas
    mfccs = librosa.feature.mfcc(y=input_audio, sr=sr_user, n_mfcc=n_mfcc)
    delta_mfccs = librosa.feature.delta(mfccs)
    delta2_mfccs = librosa.feature.delta(mfccs, order=2)
    mfccs_features = np.concatenate((mfccs, delta_mfccs, delta2_mfccs))

    # Plot all
    fig_names = ['Mfccs', 'Delta_Mfccs', 'Delta2_Mfccs', 'Mfccs_Concat_Features']
    spectplots.plot_spectrogram(mfccs, delta_mfccs, delta2_mfccs, mfccs_features,
                                 sr_user, audfile_name, fig_name=fig_names,
                                 output_path='outputs', uniqueIdentifier=unique_id)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Extract and plot MFCCs and their deltas from an audio file.')
    parser.add_argument('--file', type=str, required=True, help='Path to audio file (in audio1/ folder)')
    parser.add_argument('--sampling-rate', type=int, required=True, help='Sampling rate for audio loading')
    parser.add_argument('--nmfcc', type=int, required=True, help='Number of MFCCs to extract (<= 20)')
    parser.add_argument('--unique-id', type=str, required=True, help='Unique identifier for output image naming')

    args = parser.parse_args()

    compute_and_plot_mfcc_features(
        input_file=os.path.join('audio1', args.file),
        sr_user=args.sampling_rate,
        n_mfcc=args.nmfcc,
        unique_id=args.unique_id
    )
`.trim();
    setCode(generatedCode);
    setCodeHtml(`<pre>${generatedCode}</pre>`);
  };

  

  const handleRun = async () => {
    setLoading(true);
    setShowImages(false);
    const data = {
      audioPath: selectedFile,
      nmfcc:inputs.find(input => input.id === 'nmfcc').value,
      sr:inputs.find(input => input.id === 'sampling-rate').value,
    };

    try {
      const response = await axios.post('http://localhost:5000/exp6', data,{
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
    a.download = "exp6e.py";
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
            width="750"
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
