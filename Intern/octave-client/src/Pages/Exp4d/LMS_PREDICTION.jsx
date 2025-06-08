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
    { id: 'frame-length', label: 'Frame Length (samples)', min: 1, max: 8192, step: 1, value: 1024 },
    { id: 'hop-length', label: 'Hop Length (samples)', min: 1, max: 8192, step: 1, value: 512 }
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
import os
import Spectrogram_Plots  # Your plotting module

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Generate Log-Amplitude and Log-Frequency Spectrograms from audio.')
    parser.add_argument('--file', type=str, required=True, help='Audio file name (in audio1/ folder)')
    parser.add_argument('--frame', type=int, required=True, help='Frame length (n_fft)')
    parser.add_argument('--hop', type=int, required=True, help='Hop length')
    parser.add_argument('--unique-id', type=str, required=True, help='Unique identifier for output files')

    args = parser.parse_args()

    # Set file paths
    input_file = os.path.join("audio1", args.file)
    output_dir = 'outputs'
    os.makedirs(output_dir, exist_ok=True)

    print(f"\nAudio file selected is :: {args.file}")

    # Load audio with original sampling rate
    input_audio, sr = librosa.load(input_file, sr=None)
    sample_duration = 1 / sr
    tot_samples = len(input_audio)

    print(f"\nSampling Rate used for the audio file {args.file} :: {sr}")
    print(f"Frame Length selected for the audio file {args.file} :: {args.frame}")
    print(f"Hop Length used for the audio file {args.file} :: {args.hop}")
    print(f"One sample lasts for {sample_duration:.6f} seconds")
    print(f"Total number of samples in the audio file is::{tot_samples}")
    print(f"Audio duration is::{tot_samples * sample_duration:.2f} seconds")

    # STFT computation
    STFT = librosa.stft(input_audio, n_fft=args.frame, hop_length=args.hop)

    print(f"Number of frequency bins obtained after STFT::{STFT.shape[0]}")
    print(f"Number of frames obtained after STFT::{STFT.shape[1]}")

    # Power Spectrogram
    Y_STFT = np.abs(STFT) ** 2
    Y_log_scale = librosa.power_to_db(Y_STFT)

    STR_FIGNAME = ['Log_Amplitude_Spectrogram', 'Log-Frequency Spectrogram']

    # Plot log-amplitude spectrogram
    Spectrogram_Plots.plot_spectrogram(
        Y_log_scale,
        sr,
        args.hop,
        audfile_name=args.file,
        fig_name=STR_FIGNAME[0],
        output_path=output_dir,
        uniqueIdentifier=args.unique_id
    )

    # Plot log-frequency spectrogram
    Spectrogram_Plots.plot_spectrogram(
        Y_log_scale,
        sr,
        args.hop,
        audfile_name=args.file,
        fig_name=STR_FIGNAME[1],
        output_path=output_dir,
        uniqueIdentifier=args.unique_id,
        y_axis="log"
    )

    print("\nOperation completed successfully.")
`.trim();
    setCode(generatedCode);
    setCodeHtml(`<pre>${generatedCode}</pre>`);
  };

  

  const handleRun = async () => {
    setLoading(true);
    setShowImages(false);
    const data = {
      audioPath: selectedFile,
      hop:inputs.find(input => input.id === 'hop-length').value,
      frame:inputs.find(input => input.id === 'frame-length').value,
    };

    try {
      const response = await axios.post('http://localhost:5000/exp4', data,{
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
    a.download = "audio_processor_sample.py";
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
