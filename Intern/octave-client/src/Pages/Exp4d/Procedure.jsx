import React from 'react'
import plot from './plot.png'

const Procedure = () => {
  return (
    <div>
      <ol className='list-decimal space-y-5 '>
        <li>Place a list of different audio files approximately 10 in number in a folder namely “Input Audio”.</li>
        <li>Select a particular audio file from the folder and carry out the process of analog to digital conversion through sampling and quantization.</li>
        <li>After obtaining the digitized version of the audio file the next process involves framing that denotes bundling together of different samples of the audio file in multiple frames. 
          The number of frames selected that also denotes the frame size must be power of 2 in an audio file. 
          Typical values are generally in the range of 256 to 8192.</li>
          <li>Select the sampling rate, frame length and hop length from a particular audio file.</li>
        <li>Carry out the process of loading of the audio files using ‘librosa’ (Part of DDSP Library), with different values of the sampling rate.</li>
        <li>Using the inbuilt Short Time Fourier Transform Function using ‘librosa’ (Part of DDSP Library), extract the STFT coefficients from the audio with different values of frame length and hop length.</li>
        <li>Calculate the spectrograms from the audio.</li>
        <li>Plot the spectrograms extracted from the audio.</li>
        <li>Plot the Log-amplitude spectrograms from the audio.</li>
        <li>Plot the Log-frequency spectrograms from the audio.</li>
        <li><b>The above steps from Step 1 to Step 10 needs to be repeated for all the 10 audio files.</b></li>
      </ol>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={plot} alt="plot" style={{ maxWidth: "70%" }} />
      </div>
    </div>
  )
}

export default Procedure
