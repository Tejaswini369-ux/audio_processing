import React from 'react'
import figure1 from './figure1.png'
import figure2 from './figure2.png'

const Theory = () => {
  return (
    <div className='leading-loose text-sm'>
      <p className='font-bold text-xl text-green underline'>Extraction of various spectrograms from different audio files</p>
      <p>
      To carry out the process of extracting various audio files using the concept of Short-Time Fourier Transform (STFT), 
      one must analyze the time-frequency representation of the signals, applying windowing techniques to segment the audio and transform each segment into the frequency domain for further processing and feature extraction. 
      To extract various audio files using the Short-Time Fourier Transform (STFT), you can divide the audio into short segments, apply a Fourier Transform to each segment, and then analyze the resulting time-frequency representation (spectrogram) to identify and extract specific audio events or features.
      <br />
      <b>Spectrograms</b> are visual representations of audio – representing time, frequency, and amplitude all on one graph. 
      They visually reveal audio problems by sight, like broadband, electrical, or intermittent noise, which can help us make decisions with mixing music or editing sound.
      <br />
      STFT is a powerful tool for analyzing audio signals that change over time, allowing you to see how the frequency content of a signal evolves. 
      STFT provides a time-frequency representation, which is crucial for analyzing audio signals that are not static in frequency content, such as speech, music, and environmental sounds. 
      <br />
      There are following steps for applying STFT for Audio Extraction:
      <ol style={{ display: "block", listStyleType: "decimal", paddingLeft: "20px" }}>
        <li><b>Identify Audio Events:</b> By analyzing the spectrogram, you can identify specific audio events, such as musical notes, speech segments, or environmental sounds, based on their frequency content and timing. </li>
        <li><b>Feature Extraction:</b> You can extract features from the spectrogram, such as Mel-frequency cepstral coefficients (MFCCs), which are commonly used in speech recognition and music analysis.</li>
        <li><b>Audio Segmentation/Separation:</b> STFT can be used to identify the boundaries between different audio segments or sources, allowing you to separate them.</li>
      </ol>
      <p className='font-bold text-xl text-green underline'>Expression of the Short Time Fourier Transform</p>
      The STFT considers only a short-duration segment of a longer signal and computes its Fourier transform. Typically, this is accomplished by multiplying a longer time function x[n] by a window function w[n] that is brief in duration. 
      Two commonly-used finite duration windows are the rectangular window, which essentially extracts only the desired short sequence without further modification, and the Hamming window, 
      which applies a taper to the ends to improve the representation in the frequency domain. If the continuous frequency variable is used (as in the DTFT), the STFT can be described as
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={figure1} alt="figure1" style={{ maxWidth: "35%" }} />
      </div>
      <b>Calculations</b>
      <ol style={{ display: "block", listStyleType: "decimal", paddingLeft: "20px" }}>
        <li>Number of frequency bins.</li>
        <li>Number of frames.</li>
      </ol>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={figure2} alt="figure2" style={{ maxWidth: "40%" }} />
      </div>
      </p><br />
    </div>
  )
}

export default Theory

