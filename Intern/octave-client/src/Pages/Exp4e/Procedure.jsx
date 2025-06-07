import React from 'react'

const Procedure = () => {
  return (
    <div>
      <ol className='list-decimal space-y-5 '>
        <li>Place a list of different number of audio files in a folder namely “Input Audio”.</li>
        <li>Enter the value of sampling rate from the user. The default sampling rate used is 22050 Hz.</li>
        <li>Select a particular audio file from the folder and carry out the process of loading using ‘librosa’ (Part of DDSP Library), based on the entered sampling rate from the user. Some typical values are generally in the range of 1000 to 22050.</li>
        <li>Determine the values of the single sample duration, total number of samples in the audio file and audio duration based on the selected audio file in <b>Step 3</b>.</li>
        <li>Enter the value of Hop Length from the user as powers of 2. Some typical values are generally in the range of 256 to 1024 as powers of 2.</li>
        <li>Enter the Number of <b>FFT components</b> from the user as powers of 2. Some typical values are generally in the range of 256 to 1024.</li>
        <li>Enter the number of MEL Bands from the user to generate less than 128.</li>
        <li>After that carry out the process of extraction of the <b>MEL filter banks</b>.</li>
        <li>Plot the spectrogram of the MEL filter banks based on its values.</li>
        <li>After that carry out the process of extraction of <b>MEL Spectrograms</b> from the selected input audio.</li>
        <li>Convert the <b>MEL Spectrograms</b> to log scale for better visualization.</li>
        <li>Lastly plot the <b>MEL Spectrograms</b> corresponding to the selected audio file in <b>Step 3</b>.</li>
        <li>The above steps from <b>Step 2</b> to <b>Step 12</b> needs to be repeated for all the other audio files of <b>Step 1</b>.</li>
      </ol>
    </div>
  )
}

export default Procedure
