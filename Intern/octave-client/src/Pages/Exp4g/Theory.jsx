import React from 'react'
import figure1 from './figure1.png'
import figure2 from './figure2.png'
import figure3 from './figure3.png'

const Theory = () => {
  return (
    <div className='leading-loose text-sm'>
      <p className='font-bold text-xl text-green underline'>Computation of Band Energy Ratio from different audio files</p>
      <p>
      The Band Energy Ratio (BER) provides the relation between the lower and higher frequency bands. 
      It can be thought of as the measure of how dominant low frequencies are. 
      This feature has been extensively used in music/speech discrimination, music classification etc.<br />
      The Band Energy Ratio (BER) is an important feature in audio signal processing that measures the distribution of energy across different frequency bands. It is widely used in speech analysis, music classification, and environmental sound recognition. 
      By dividing an audio signal into multiple frequency bands and computing the ratio of energy in each band to the total energy, we can analyze the characteristics of the sound.<br />
      An audio signal consists of multiple frequencies, and different sounds emphasize different frequency ranges. For example:
      <ul style={{ display: "block", listStyleType: "disc", paddingLeft: "20px" }}>
        <li>Speech signals have more energy in the lower frequency bands (below 4 kHz).</li>
        <li>Music signals may have energy spread across a wider range of frequencies.</li>
      </ul>
      The Band Energy Ratio helps in understanding how energy is distributed among these frequency components. 
      It is computed using the Short-Time Fourier Transform (STFT) or Wavelet Transform to analyze energy distribution over time.
      <br />
      <b>Compute the Band Energy Ratio (BER)</b><br />
      The energy in a specific frequency band is divided by the total energy of the signal:
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={figure1} alt="figure1" style={{ maxWidth: "13%" }} />
      </div>
      where E<sub>total</sub> is the sum of energy over all frequency bands.<br />
      <b>Mathematical Representation of BER</b><br />
      The total energy of the signal is computed as:
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={figure2} alt="figure2" style={{ maxWidth: "21%" }} />
      </div>
      Then, for each frequency band (e.g., low, mid, high), the Band Energy Ratio is given by:
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={figure3} alt="figure3" style={{ maxWidth: "23%" }} />
      </div>
      where:<br />
      f1, f2 are the frequency limits of the band.<br />
      ∣X(f)∣<sup>2</sup> represents the power of the signal at frequency f.<br />
      BER<sub>band</sub> represents the proportion of energy in the selected band.<br />
      <b>Steps for Computing Band Energy Ratio</b><br />
      <ul style={{ display: "block", listStyleType: "decimal", paddingLeft: "20px" }}>
        <b><li>Pre-processing the Audio File</li></b>
        <ul style={{ display: "block", listStyleType: "decimal", paddingLeft: "20px" }}>
          <li>Load the audio signal and convert it to a uniform sampling rate if required.</li>
          <li>Normalize the signal to maintain consistency in amplitude levels.</li>
        </ul>
        <b><li>Apply Short-Time Fourier Transform (STFT)</li></b>
        <ul style={{ display: "block", listStyleType: "decimal", paddingLeft: "20px" }}>
          <li>The signal is transformed from the time domain to the frequency domain using STFT.</li>
          <li>STFT provides frequency information over short time intervals.</li>
        </ul>
        <b><li>Divide the Frequency Spectrum into Bands</li></b>
        <ul style={{ display: "block", listStyleType: "decimal", paddingLeft: "20px" }}>
          <li>The full frequency range is divided into multiple bands (e.g., <b>low, mid, high-frequency bands</b>).</li>
          <li>The band division depends on the application (e.g., speech processing vs. music analysis).</li>
        </ul>
        <b><li>Compute the Energy in Each Band</li></b>
        <ul style={{ display: "block", listStyleType: "decimal", paddingLeft: "20px" }}>
          <li>The power spectrum of the signal is computed for each frequency band.</li>
          <li>The energy in each band is calculated.</li>
        </ul>
      </ul>
      </p><br />
    </div>
  )
}

export default Theory

