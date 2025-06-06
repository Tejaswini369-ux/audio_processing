import React from 'react'
import figure1 from './figure1.png'
import figure2 from './figure2.png'
import figure3 from './figure3.png'

const Theory = () => {
  return (
    <div className='leading-loose text-sm'>
      <p className='font-bold text-xl text-green underline'>Extraction of MEL Spectrograms from different audio files</p>
      <p>
      A MEL spectrogram is a time-frequency representation of an audio signal that maps frequencies to the MEL scale, 
      which mimics human auditory perception. It is widely used in speech and audio processing applications such as speech recognition, 
      music classification, and speaker identification.<br />
      A spectrogram is a visual representation of the frequency spectrum of a signal over time. 
      It is obtained by applying the Short-Time Fourier Transform (STFT) to an audio signal. 
      The spectrogram provides insights into how different frequency components of the audio signal change over time.<br />
      <b>MEL Scale and MEL Spectrogram</b><br />
      The MEL scale is a perceptual scale of pitches that is designed to approximate the way humans perceive sound frequencies. 
      The MEL spectrogram is derived by mapping the spectrogram frequencies onto the MEL scale using a bank of MEL filters. 
      This transformation helps in better capturing speech and music characteristics as perceived by human ears.<br />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={figure1} alt="figure1" style={{ maxWidth: "70%" }} />
      </div>
      The <b>steps to obtain a MEL spectrogram</b> from an audio file are as follows:
      <ol style={{ display: "block", listStyleType: "decimal", paddingLeft: "20px" }}>
        <li><b>Load the Audio File:</b> The audio signal is read using libraries like Librosa in Python.</li>
        <li><b>Pre-processing:</b> Convert the audio signal to a uniform sampling rate and normalize it if required.</li>
        <li><b>Compute the Short-Time Fourier Transform (STFT):</b> STFT is applied to extract the frequency components over time.</li>
        <li><b>Apply MEL Filter Bank:</b> The STFT output is passed through a set of MEL filters to convert the frequency axis to the MEL scale.</li>
        <li><b>Convert to Log Scale:</b> The MEL spectrogram is often converted to a logarithmic scale (dB) to improve the visibility of variations in amplitude.</li>
      </ol>
      <br /><b>Mathematical Representation</b><br />
      The MEL spectrogram is computed using the following formula:
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={figure2} alt="figure2" style={{ maxWidth: "32%" }} />
      </div>
      where:<br />
      X (k, n) is the STFT of the signal,<br />
      H<sub>m</sub>(k) represents the MEL filter bank,<br />
      S<sub>mel</sub> (m, n) is the power spectrogram mapped to the MEL scale.<br />
      To obtain a logarithmic MEL spectrogram:
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={figure3} alt="figure3" style={{ maxWidth: "22%" }} />
      </div>
      where ϵ is a small constant to avoid numerical errors.<br />
      <b>Applications of MEL Spectrograms</b>
      <ol style={{ display: "block", listStyleType: "decimal", paddingLeft: "20px" }}>
        <li><b>Speech Recognition:</b> Used in voice assistants like Google Assistant, Siri, and Alexa.</li>
        <li><b>Music Genre Classification:</b> Helps in identifying musical styles based on frequency patterns.</li>
        <li><b>Speaker Identification:</b> Used in biometric authentication and forensic applications.</li>
        <li><b>Environmental Sound Analysis:</b> Used in detecting sounds in urban environments, wildlife monitoring, etc.</li>
      </ol>
      By extracting <b>MEL spectrograms</b>, we can effectively analyze and process audio signals for various machine learning and deep learning applications.
      </p><br />
    </div>
  )
}

export default Theory

