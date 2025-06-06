import React from 'react'
import plot from './plot.png'

const Procedure = () => {
  return (
    <div>
      <ol className='list-decimal space-y-5 '>
        <li>Place a list of different audio files approximately 10 in number in a folder namely “Input Audio”.</li>
        <li>Select a particular audio file from the folder and carry out the process of loading using ‘librosa’(Part of DDSP Library), with different values of the sampling rate.</li>
        <li>Using the inbuilt Fast Fourier Transform Function of the NumPy library module, extract the FFT of the audio.</li>
        <li>Determine the Magnitude and Phase Power Spectrum from the computed FFT in <b>Step 3</b>.</li>
        <li>Plot the input audio along with the magnitude and phase power spectrum.</li>
        <li><b>The above steps from Step 1 to Step 5 needs to be repeated for all the 10 audio files.</b></li>
      </ol>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={plot} alt="plot" style={{ maxWidth: "70%" }} />
      </div>
    </div>
  )
}

export default Procedure
