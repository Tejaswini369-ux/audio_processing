import React from 'react'
import figure1 from './figure1.png'
import figure2 from './figure2.png'
import figure3 from './figure3.png'

const Theory = () => {
  return (
    <div className='leading-loose text-sm'>
      <p>
      An audio signal's "amplitude spectrum" represents the strength (amplitude) of each frequency component within the signal, 
      while the "phase spectrum" indicates the relative timing (phase) of each frequency component, essentially showing how much each frequency is shifted in time compared to a reference point, all plotted against the frequency axis; essentially, 
      they provide a detailed breakdown of the constituent frequencies that make up an audio signal and their relative timing within the waveform.
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={figure1} alt="figure1" style={{ maxWidth: "50%" }} />
      </div>
      <ul style={{ display: "block", listStyleType: "disc", paddingLeft: "20px" }}>
        <li><b>Amplitude spectrum:</b> Higher peaks on the graph indicate stronger presence of that frequency in the signal.</li>
        <li><b>Phase spectrum:</b> The phase values at each frequency represent the time shift relative to a reference point.</li>
      </ul>
      </p>
      <p className='font-bold text-xl text-green underline'>Calculating spectra:</p>
      <p>
      Both amplitude and phase spectra are typically obtained by applying a Fourier Transform (FT) to the audio signal, 
      which decomposes the signal into its constituent frequencies. 
      <br />
      Mathematically, the amplitude spectrum is represented by the <b>magnitude of the Fourier transform</b> of the signal. 
      The Fourier transform is a powerful tool that converts a signal from the time domain to the frequency domain, essentially translating the signal's representation from its behaviour over time to its composition of different frequencies.
      <br />
      The magnitude of the Fourier transforms, denoted as |F(ω)|, where ω represents the frequency, tells us the amplitude (strength) of each frequency component within the signal. 
      It's essentially a graphical representation of how much energy the signal carries at each frequency.
      <br />
      <p className='font-bold text-xl text-green underline'>Expression of the Fourier Transform</p>
      Fourier transform is a mathematical model that decomposes a function or signal into its constituent frequencies. 
      It helps to transform the signals between two different domains like transforming the frequency domain to the time domain.
      <br />
      The generalized form of the complex Fourier series is referred to as the Fourier transform. 
      Fourier transforms are used to represent the mathematical functions and frequency domain. It helps to expand the non-periodic functions and convert them into easy sinusoid functions. 
      There are two types of Fourier transform i.e., forward Fourier transform and inverse Fourier transform.
      <br />
      <b>Continuous Fourier Transform (CFT)</b>
      <br />
      For a continuous-time function f(t), the Fourier transform F(ω) is defined as:
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={figure2} alt="figure2" style={{ maxWidth: "25%" }} />
      </div>
      where:
      <ul style={{ display: "block", listStyleType: "disc", paddingLeft: "20px" }}>
        <li><b>F(ω)</b> is the Fourier transform of f(t)</li>
        <li><b>ω</b> is the Angular Frequency</li>
      </ul>
      The formula for the Fourier transforms of a function f(x) is given by:
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={figure3} alt="figure3" style={{ maxWidth: "30%" }} />
      </div>
      </p><br />
    </div>
  )
}

export default Theory

