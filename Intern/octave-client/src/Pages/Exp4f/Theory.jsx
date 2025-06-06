import React from 'react'
import figure1 from './figure1.png'
import figure2 from './figure2.png'
import figure3 from './figure3.png'
import figure4 from './figure4.png'
import figure5 from './figure5.png'
import figure6 from './figure6.png'
import figure7 from './figure7.png'

const Theory = () => {
  return (
    <div className='leading-loose text-sm'>
      <p className='font-bold text-xl text-green underline'>Extracting Mel-Frequency Cepstral Coefficients from different audio files</p>
      <p>
      Mel-Frequency Cepstral Coefficients (MFCCs) are a set of features commonly used in speech and audio processing. 
      They represent the short-term power spectrum of a signal and are widely used in applications like speech recognition, speaker identification, and music classification. 
      MFCCs are derived from the Mel-Frequency Spectrum, which mimics human auditory perception.<br />
      The MFCC computes the Mel frequency cepstral coefficients of the speech signal. 
      The process of MFCC is in entire speech data in a batch and it is partitioned the speech signal into frames and computed the cepstral features for each frame. The MFCC’s features can convert to statistics for use in the task of classification. 
      Its distributions can observe from the probability density functions of each of the Mel-frequency cepstral coefficients. The MFCC is split the entire data into overlapping segments and the window length is determined the length of each segment. The overlap length is the determination of length of overlap between segments. The process of MFCC is pre-emphasis, frame blocking, windowing, fast Fourier transform, Mel frequency filter bank and discrete cosine transform. 
      The pre-emphasis is the sample to pass through the filter for emphasizing the higher frequencies.<br />
      In framing, the input speech signal is segmented as small duration block known as frames and this process is essential in speech because of speech is time varying signals. 
      The sample of framing for input speech signal is illustrated in Figure 1.
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={figure1} alt="figure1" style={{ maxWidth: "35%" }} />
      </div>
      In order to perform the continuity of speech signal, these frames are multiplied with windowing methods.<br />
      The windowing function is performed to smooth the signal for computation. The output of windowing is
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={figure2} alt="figure2" style={{ maxWidth: "22%" }} />
      </div>
      where, N<sub>m</sub> is the quantity of samples in every frame and X(m) is input speech signal and W<sub>n</sub>(m) is the hamming window.<br />
      Many window functions are existed among them hamming window is mainly used for speech signal analysis because its resulting frequency resolution is better than other windowing methods. 
      The equation for the hamming window is
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={figure3} alt="figure3" style={{ maxWidth: "30%" }} />
      </div>
      The function of fast Fourier transform is to convert the time domain into the frequency domain.
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={figure4} alt="figure4" style={{ maxWidth: "18%" }} />
      </div>
      The input for the fast Fourier transform is the windowed signal and its output is the discrete frequency bands. The fast Fourier transform sizes are 512, 1024 or 2048. The discrete Fourier transform formula is
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={figure5} alt="figure5" style={{ maxWidth: "19%" }} />
      </div>
      The Mel is a unit of pitch and the Mel-frequency scale is the approximation of linear frequency (1KHz) and then close to logarithmic for higher frequencies. The Mel scale is applied the filter banks according to the spectrum and the output is the sum of filtered spectral components. 
      The MFCC’s log energy computation is performed by the logarithm of the square magnitude of the Mel filter bank’s output. And it compresses the dynamic range of values.
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={figure6} alt="figure6" style={{ maxWidth: "20%" }} />
      </div>
      The discrete cosine transform is processed the conversion from the log Mel spectrum into time domain and it is known as Mel frequency cepstrum coefficient.
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={figure7} alt="figure7" style={{ maxWidth: "29%" }} />
      </div>
      The step-by-step process of MFCC for feature extraction is shown in Figure 2.
      </p><br />
    </div>
  )
}

export default Theory

