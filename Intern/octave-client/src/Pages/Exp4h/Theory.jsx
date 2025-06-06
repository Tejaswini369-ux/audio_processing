import React from 'react'
import figure1 from './figure1.png'
import figure2 from './figure2.png'

const Theory = () => {
  return (
    <div className='leading-loose text-sm'>
      <p className='font-bold text-xl text-green underline'>Extracting Spectral Centroid and Bandwidth from different audio files</p>
      <p>
      The experiment of extracting spectral centroid and bandwidth from different audio files relies on analyzing the frequency content of audio signals. 
      The spectral centroid represents the "center of mass" of the spectrum, while bandwidth indicates the spread or width of the spectrum.<br />
      Spectral features are widely used in <b>audio signal processing</b> to analyze the frequency characteristics of a sound. Two important spectral features are:
      <ul style={{ display: "block", listStyleType: "decimal", paddingLeft: "20px" }}>
        <li><b>Spectral Centroid:</b> Represents the center of mass of the frequency spectrum, giving an indication of the perceived brightness of a sound.</li>
        <li><b>Spectral Bandwidth:</b> Measures the spread of the spectral energy around the centroid, indicating how wide or narrow the frequency distribution is.</li>
      </ul>
      These features are useful in speech recognition, music classification, and environmental sound analysis.<br />
      The spectral centroid is a measure used in digital signal processing to characterize a spectrum, indicating the location of the center of mass of the spectrum. The Spectral Centroid is the weighted mean of the frequencies present in the signal, 
      where the weights are the magnitudes of the corresponding frequencies. It is often associated with the brightness of a sound—a higher spectral centroid means the sound has more high-frequency components.<br />
      The spectral centroid is calculated as:<br />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={figure1} alt="figure1" style={{ maxWidth: "21%" }} />
      </div>
      where:<br />
      SC = Spectral Centroid<br />
      X(f) = Magnitude of the frequency component f<br />
      N = Maximum frequency component<br />
      A low spectral centroid (e.g., below 500 Hz) is associated with bass-heavy or dull sounds.<br />
      A high spectral centroid (e.g., above 2000 Hz) is associated with bright or sharp sounds.<br />
      The Spectral Bandwidth represents the spread of frequencies around the spectral centroid. 
      It measures how wide or narrow the frequency distribution is, providing insight into the timbre or texture of a sound.
      Spectral bandwidth is typically measured as the standard deviation of the frequency distribution around the spectral centroid:<br />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={figure2} alt="figure2" style={{ maxWidth: "26%" }} />
      </div>
      where:<br />
      SBW = Spectral Bandwidth<br />
      SC = Spectral Centroid<br />
      X(f) = Magnitude of the frequency component f<br />
      <b>Low spectral bandwidth:</b> The sound is dominated by a narrow frequency range, such as a pure tone or flute sound. <br />
      <b>High spectral bandwidth:</b> The sound contains a wide range of frequencies, such as noise, cymbals, or distorted guitar.
      </p><br />
    </div>
  )
}

export default Theory

