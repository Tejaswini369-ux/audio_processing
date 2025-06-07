import React from 'react'

const Procedure = () => {
  return (
    <div>
      <ol className='list-decimal space-y-5 '>
        <li>Place a list of different number of audio files in a folder namely “Input Audio”.</li>
        <li>Enter the value of sampling rate from the user. The default sampling rate used is 22050 Hz.</li>
        <li>Select a particular audio file from the folder and carry out the process of loading using ‘librosa’ (Part of DDSP Library), based on the entered sampling rate from the user. Some typical values are generally in the range of 1000 to 22050.</li>
        <li>Determine the values of the single sample duration, total number of samples in the audio file and audio duration based on the selected audio file in <b>Step 3</b>.</li>
        <li>Enter the <b>Number of Mel-Frequency Cepstral Coefficients (MFCC) values</b> from the user preferably less than 20.</li>
        <li>After that carry out the process of extraction of the <b>Mel-Frequency Cepstral Coefficients (MFCC) values</b> from the selected input audio of <b>Step 3</b>.</li>
        <li>After that compute the first and second order MFCCs derivatives.</li>
        <li>Combine all the <b>MFCC features</b> of <b>Step 6</b> and <b>Step 7</b> into a single feature.</li>
        <li>Lastly plot the <b>MFCCs values</b> along with its derivatives corresponding to the selected audio file in <b>Step 3</b>.</li>
        <li>The above steps from <b>Step 2</b> to <b>Step 9</b> needs to be repeated for all the other audio files of <b>Step 1</b>.</li>
      </ol>
    </div>
  )
}

export default Procedure
