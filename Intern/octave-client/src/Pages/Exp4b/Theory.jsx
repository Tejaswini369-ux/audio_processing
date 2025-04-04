import React from 'react'
import figure1 from './figure1.png'
import figure2 from './figure2.png'

const Theory = () => {
  return (
    <div className='leading-loose text-sm'>
      <p className='font-bold text-xl text-green underline'>Extraction of RMS Energy and Zero Crossing Rate features of different audio files</p>
      <p>
      To extract features, we must break down the audio file into windows, 
      often between 20 and 100 milliseconds. We then extract these features per window and can run a classification algorithm for example on each window. 
      There are some methods to extract features:
      <ol style={{ display: "block", listStyleType: "decimal", paddingLeft: "20px" }}>
        <li>Statistical Features</li>
        <li>Energy</li>
        <li>Root Mean Square Energy</li>
        <li>Zero-Crossing Rate</li>
        <li>Tempo</li>
        <li>Mel Frequency Cepstral Coefficients (MFCC)</li>
        <li>Mel Frequency Cepstral Differential Coefficients</li>
        <li>Polyfeatures</li>
        <li>Tempogram</li>
        <li>Spectal Features</li>
        <li>Fundamental Frequency</li>
        <li>Jitter Feature</li>
        <li>Meta features</li>
        <li>Dimension reduction</li>
      </ol>
      <br />
      <p className='font-bold text-xl text-green underline'>Root Mean Square Energy</p>
      The RMS Energy (RMSE) is simply the square root of the mean squared amplitude over a time window. The overall magnitude of a signal corresponds to its energy. 
      For audio signals, this generally equates to how loud the signal is. 
      The signal’s energy is calculated as follow 
      <br />
      RMS is one of the average loudness meters. It is calculated as the average loudness of the sound waveform. 
      For the calculations, the Root Mean Square formula is used.
      <br />
      RMS is a useful method of computing the average of variables across time. When dealing with audio, 
      the signal value (amplitude) is squared, averaged over time, and then the square root of the result is determined.
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={figure1} alt="figure1" style={{ maxWidth: "50%" }} />
      </div>
      The mathematical definition of a signal’s root-mean-square energy (RMSE) is:
      <br />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={figure2} alt="figure2" style={{ maxWidth: "45%" }} />
      </div>
      RMSE acts as an indicator of loudness, since higher the energy, louder the sound. 
      It is however less sensitive to outliers as compared to the Amplitude Envelope. 
      This feature has been useful in audio segmentation and music genre classification tasks.
      <p className='font-bold text-xl text-green underline'>Zero-Crossing Rate</p>
      The zero-crossing rate indicates the number of times that a signal crosses the horizontal axis, i.e. the number of times that the amplitude reaches 0. 
      Zero-Crossing Rate is simply the number of times a waveform crosses the horizontal time axis. 
      This feature has been primarily used in recognition of percussive vs pitched sounds, monophonic pitch estimation, voice/unvoiced decision for speech signals, etc.
      <br />
      Root means square value of all the samples in the frame of an audio file. Similarly, what is zero crossing rate feature in the case of an audio file.
      <br />
      Zero-crossing rate (ZCR) is a weighted measure of the number of times the signal changes sign in a frame, 
      i.e. from positive to zero to negative or from negative to zero to positive.
      <br />
      In other words, the number of times a signal crosses the horizontal axis. ZCR is high for noisy (unvoiced) sounds and low for tonal (voiced) sounds. 
      It is used to calculate the smoothness of the signal. 
      For simple periodic signals, it is roughly related to the fundamental frequency.
      </p><br />
    </div>
  )
}

export default Theory

