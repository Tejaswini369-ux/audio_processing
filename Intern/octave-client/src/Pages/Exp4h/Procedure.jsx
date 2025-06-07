import React from 'react'

const Procedure = () => {
  return (
    <div>
      <ol className='list-decimal space-y-5 '>
      <li>Place a list of different number of audio files in a folder namely “Input Audio”.</li>
      <li>Enter the value of sampling rate from the user. The default sampling rate used is 22050 Hz.</li>
      <li>Select a particular audio file from the folder and carry out the process of loading using ‘librosa’ (Part of DDSP Library), based on the entered <b>sampling rate</b> from the user. Some typical values of the sampling rate are generally in the range of 1000 to 22050.</li>
      <li>Determine the values of the single sample duration, total number of samples in the audio file and audio duration based on the selected audio file in <b>Step 3</b>.</li>
      <li>Enter the values of Frame Length and Hop Length from the user as powers of 2. Some typical values of Frame Length are generally in the range of 256 to 8192 and Hop Length are generally in the range of 256 to 1024 as powers of 2.</li>
      <li>After that carry out the process of extraction of the spectrograms based on the <b>Short Time Fourier Transform Feature.</b></li>
      <li>Compute the values of the <b>Spectral Centroid</b> using the inbuilt spectral centroid feature of the librosa library.</li>
      <li>Compute the values of the <b>Spectral Bandwidth</b> using the inbuilt spectral bandwidth feature of the librosa library.</li>
      <li>Lastly plot the <b>Spectrograms</b> with frequency values in log scale along with the <b>Spectral Centroid</b> and <b>Spectral Bandwidth</b> corresponding to the selected audio file in <b>Step 3</b>.</li>
      <li>The above steps from <b>Step 2</b> to <b>Step 9</b> needs to be repeated for all the other audio files of <b>Step 1</b>.</li>
      </ol>
    </div>
  )
}

export default Procedure
