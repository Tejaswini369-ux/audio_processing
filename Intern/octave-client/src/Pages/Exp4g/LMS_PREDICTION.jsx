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
    { id: 'frame-length', label: 'Frame Length (samples)', min: 1, max: 8192, step: 1, value: 1024 },
    { id: 'hop-length', label: 'Hop Length (samples)', min: 1, max: 8192, step: 1, value: 512 },
    { id: 'frequency', label: 'Number of frequency bins', min: 1, max: 10000, step: 1, value: 512 }
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
import numpy as np
import os
import argparse
import Spectrogram_Plots_6 as spectplots
import SPLIT_BAND_ENERGY_RATIO as SPER  # Assuming SPER contains helper functions

def compute_and_plot_ber_features(input_file, sr_user, frame_length, hop_length, split_freq, unique_id, output_dir='outputs'):
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

    # STFT computation
    SPECT = librosa.stft(input_audio, n_fft=frame_length, hop_length=hop_length)
    Y_SPECT = np.abs(SPECT) ** 2
    Y_SPECT_log_scale = librosa.power_to_db(Y_SPECT)

    print(f"\nNumber of frequency bins: {SPECT.shape[0]}")

    # Compute Band Energy Ratio
    Split_Frequency_Bin = SPER.calculate_split_frequency_bin(split_freq, sr_user, SPECT.shape[0])
    BER = SPER.band_energy_ratio(SPECT, split_freq, sr_user)

    # Plot
    fig_names = ['LOG_FREQ_SPECTROGRAM', 'BAND_ENERGY_RATIO']
    spectplots.plot_spectrogram(
        Y_SPECT_log_scale,
        sr_user,
        hop_length,
        BER,
        audfile_name,
        fig_name=fig_names,
        output_path='outputs',
        uniqueIdentifier=unique_id
    )

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Extract and plot Log-Frequency Spectrogram and Band Energy Ratio from an audio file.')
    parser.add_argument('--file', type=str, required=True, help='Path to audio file (inside audio1/ folder)')
    parser.add_argument('--sampling-rate', type=int, required=True, help='Sampling rate for audio loading')
    parser.add_argument('--frame-length', type=int, required=True, help='Frame length (n_fft), typically power of 2')
    parser.add_argument('--hop-length', type=int, required=True, help='Hop length, typically power of 2')
    parser.add_argument('--split-freq', type=int, required=True, help='Split frequency for Band Energy Ratio')
    parser.add_argument('--unique-id', type=str, required=True, help='Unique identifier for output filenames')

    args = parser.parse_args()

    compute_and_plot_ber_features(
        input_file=os.path.join('inputs', args.file),
        sr_user=args.sampling_rate,
        frame_length=args.frame_length,
        hop_length=args.hop_length,
        split_freq=args.split_freq,
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
      hop:inputs.find(input => input.id === 'hop-length').value,
      frame:inputs.find(input => input.id === 'frame-length').value,
      sr:inputs.find(input => input.id === 'sampling-rate').value,
      freq:inputs.find(input => input.id === 'frequency').value,
    };

    try {
      const response = await axios.post('http://localhost:5000/exp7', data,{
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
            width="720"
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
