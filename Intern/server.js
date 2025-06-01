const express = require('express');
const path = require('path');
const { exec ,spawn} = require('child_process');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'Outputs')));


app.post('/process_audio', async (req, res) => {
  try {
    console.log(req.body);
    const { audioPath, hop, frame, sr, feature } = req.body;
    const uniqueIdentifier = uuidv4();
    
    // Path configuration
    const pythonScript = path.join(__dirname, 'process_audio.py');
    const inputFile = path.join(__dirname, 'Inputs', audioPath);

    // Build the Python command
    const args = [
      '--file', inputFile.toString(),
      '--hop', hop.toString(),
      '--frame', frame.toString(),
      '--sr', sr.toString(),
      '--feature', feature,
      '--unique-id', uniqueIdentifier
    ];

    // Execute Python script
const pythonProcess = spawn('/mnt/c/Users/user/Downloads/Audio_signal/audio_processing/Intern/env/bin/python', [pythonScript, ...args], {
  cwd: __dirname
});

    // Handle output
    let stdoutData = '';
    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    // Handle errors
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`);
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({
          error: `Python script exited with code ${code}`,
          details: stdoutData
        });
      }
  const imageUrls = [
    `/Outputs/${uniqueIdentifier}_AmplitudeEnvelope.png`
    
  ];
res.status(200).json({ images: imageUrls });

    });

  } catch (err) {
    console.error('Error handling the request:', err);
    res.status(500).send(err);
  }
});
app.use('/outputs', express.static(path.join(__dirname, 'outputs')));


//rls

app.post('/rls', async (req, res) => {
  try {
    console.log(req.body);
    const { audioPath, hop, frame, feature } = req.body;
    const uniqueIdentifier = uuidv4();
    
    // Path configuration
    const pythonScript = path.join(__dirname, 'rls.py');
    const inputFile = path.join(__dirname, 'Inputs', audioPath);

    // Build the Python command
    const args = [
      '--file', inputFile.toString(),
      '--hop', hop.toString(),
      '--frame', frame.toString(),
      '--unique-id', uniqueIdentifier
    ];

    // Execute Python script
const pythonProcess = spawn('/mnt/c/Users/user/Downloads/Audio_signal/audio_processing/Intern/env/bin/python', [pythonScript, ...args], {
  cwd: __dirname
});

    // Handle output
    let stdoutData = '';
    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    // Handle errors
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`);
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({
          error: `Python script exited with code ${code}`,
          details: stdoutData
        });
      }
  const imageUrls = [
    `/Outputs/${uniqueIdentifier}_RMSE_Plot.png`,
    `/Outputs/${uniqueIdentifier}_ZCR_Plot.png`
    
  ];
res.status(200).json({ images: imageUrls });

    });

  } catch (err) {
    console.error('Error handling the request:', err);
    res.status(500).send(err);
  }
});
app.use('/outputs', express.static(path.join(__dirname, 'outputs')));


//exp3
app.post('/exp3', async (req, res) => {
  try {
    console.log(req.body);
    const { audioPath,  start_sample,num_samples, sr} = req.body;
    const uniqueIdentifier = uuidv4();
    
    // Path configuration
    const pythonScript = path.join(__dirname, 'exp3.py');
    const inputFile = path.join(__dirname, 'Inputs', audioPath);

    // Build the Python command
    const args = [
      '--file', inputFile.toString(),
      '--sampling-rate', sr.toString(),
      '--start-sample', start_sample.toString(),
      '--num-samples', num_samples.toString(),
      '--unique-id', uniqueIdentifier
    ];

    // Execute Python script
const pythonProcess = spawn('/mnt/c/Users/user/Downloads/Audio_signal/audio_processing/Intern/env/bin/python', [pythonScript, ...args], {
  cwd: __dirname
});

    // Handle output
    let stdoutData = '';
    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    // Handle errors
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`);
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({
          error: `Python script exited with code ${code}`,
          details: stdoutData
        });
      }
  const imageUrls = [
    `/Outputs/${uniqueIdentifier}_exp3.png`
    
  ];
res.status(200).json({ images: imageUrls });

    });

  } catch (err) {
    console.error('Error handling the request:', err);
    res.status(500).send(err);
  }
});
app.use('/outputs', express.static(path.join(__dirname, 'outputs')));

//exp4

app.post('/exp4', async (req, res) => {
  try {
    console.log(req.body);
    const { audioPath,  hop,frame} = req.body;
    const uniqueIdentifier = uuidv4();
    
    // Path configuration
    const pythonScript = path.join(__dirname, 'exp4.py');
    const inputFile = path.join(__dirname, 'Inputs', audioPath);

    // Build the Python command
    const args = [
      '--file', inputFile.toString(),
      '--hop', hop.toString(),
      '--frame', frame.toString(),
      '--unique-id', uniqueIdentifier
    ];

    // Execute Python script
const pythonProcess = spawn('/mnt/c/Users/user/Downloads/Audio_signal/audio_processing/Intern/env/bin/python', [pythonScript, ...args], {
  cwd: __dirname
});

    // Handle output
    let stdoutData = '';
    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    // Handle errors
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`);
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({
          error: `Python script exited with code ${code}`,
          details: stdoutData
        });
      }
  const imageUrls = [
  `/outputs/Log_Amplitude_Spectrogram_${uniqueIdentifier}.jpg`,
  `/outputs/Log_Frequency_Spectrogram_${uniqueIdentifier}.jpg`
  ];
res.status(200).json({ images: imageUrls });

    });

  } catch (err) {
    console.error('Error handling the request:', err);
    res.status(500).send(err);
  }
});
app.use('/outputs', express.static(path.join(__dirname, 'outputs')));

//exp5

app.post('/exp5', async (req, res) => {
  try {
    console.log(req.body);
    const { audioPath, sr,hop,nfft,nmels} = req.body;
    const uniqueIdentifier = uuidv4();
    
    // Path configuration
    const pythonScript = path.join(__dirname, 'exp5.py');
    const inputFile = path.join(__dirname, 'Inputs', audioPath);

    // Build the Python command
    const args = [
      '--file', inputFile.toString(),
      '--sampling-rate', sr.toString(),
      '--hop-length', hop.toString(),
      '--nfft', nfft.toString(),
      '--nmels', nmels.toString(),
      '--unique-id', uniqueIdentifier
    ];

    // Execute Python script
const pythonProcess = spawn('/mnt/c/Users/user/Downloads/Audio_signal/audio_processing/Intern/env/bin/python', [pythonScript, ...args], {
  cwd: __dirname
});

    // Handle output
    let stdoutData = '';
    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    // Handle errors
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`);
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({
          error: `Python script exited with code ${code}`,
          details: stdoutData
        });
      }
  const imageUrls = [
  `/outputs/MEL_Spectrogram_${uniqueIdentifier}.jpg`,
  `/outputs/MEL_FILTER_BANKS_${uniqueIdentifier}.jpg`
  ];
res.status(200).json({ images: imageUrls });

    });

  } catch (err) {
    console.error('Error handling the request:', err);
    res.status(500).send(err);
  }
});
app.use('/outputs', express.static(path.join(__dirname, 'outputs')));


//exp6

app.post('/exp6', async (req, res) => {
  try {
    console.log(req.body);
    const { audioPath, sr,nmfcc} = req.body;
    const uniqueIdentifier = uuidv4();
    
    // Path configuration
    const pythonScript = path.join(__dirname, 'exp6.py');
    const inputFile = path.join(__dirname, 'Inputs', audioPath);

    // Build the Python command
    const args = [
      '--file', inputFile.toString(),
      '--sampling-rate', sr.toString(),
      '--nmfcc', nmfcc.toString(),
      '--unique-id', uniqueIdentifier
    ];

    // Execute Python script
const pythonProcess = spawn('/mnt/c/Users/user/Downloads/Audio_signal/audio_processing/Intern/env/bin/python', [pythonScript, ...args], {
  cwd: __dirname
});

    // Handle output
    let stdoutData = '';
    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    // Handle errors
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`);
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({
          error: `Python script exited with code ${code}`,
          details: stdoutData
        });
      }
  const imageUrls = [
  `/outputs/Delta_MFCCS_Features_${uniqueIdentifier}.jpg`
  ];
res.status(200).json({ images: imageUrls });

    });

  } catch (err) {
    console.error('Error handling the request:', err);
    res.status(500).send(err);
  }
});
app.use('/outputs', express.static(path.join(__dirname, 'outputs')));

//exp7

app.post('/exp7', async (req, res) => {
  try {
    console.log(req.body);
    const { audioPath, sr,hop,frame,freq} = req.body;
    const uniqueIdentifier = uuidv4();
    
    // Path configuration
    const pythonScript = path.join(__dirname, 'exp7.py');
    const inputFile = path.join(__dirname, 'Inputs', audioPath);

    // Build the Python command
    const args = [
      '--file', inputFile.toString(),
      '--sampling-rate', sr.toString(),
      '--hop-length', hop.toString(),
      '--frame-length', frame.toString(),
      '--split-freq', freq.toString(),
      '--unique-id', uniqueIdentifier
    ];

    // Execute Python script
const pythonProcess = spawn('/mnt/c/Users/user/Downloads/Audio_signal/audio_processing/Intern/env/bin/python', [pythonScript, ...args], {
  cwd: __dirname
});

    // Handle output
    let stdoutData = '';
    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    // Handle errors
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`);
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({
          error: `Python script exited with code ${code}`,
          details: stdoutData
        });
      }
  const imageUrls = [
  `/outputs/${uniqueIdentifier}_BER_LogSpectrogram.jpg`
  ];
res.status(200).json({ images: imageUrls });

    });

  } catch (err) {
    console.error('Error handling the request:', err);
    res.status(500).send(err);
  }
});
app.use('/outputs', express.static(path.join(__dirname, 'outputs')));

//exp8

app.post('/exp8', async (req, res) => {
  try {
    console.log(req.body);
    const { audioPath, sr,hop,frame} = req.body;
    const uniqueIdentifier = uuidv4();
    
    // Path configuration
    const pythonScript = path.join(__dirname, 'exp8.py');
    const inputFile = path.join(__dirname, 'Inputs', audioPath);

    // Build the Python command
    const args = [
      '--file', inputFile.toString(),
      '--sampling-rate', sr.toString(),
      '--hop-length', hop.toString(),
      '--frame-length', frame.toString(),
      '--unique-id', uniqueIdentifier
    ];

    // Execute Python script
const pythonProcess = spawn('/mnt/c/Users/user/Downloads/Audio_signal/audio_processing/Intern/env/bin/python', [pythonScript, ...args], {
  cwd: __dirname
});

    // Handle output
    let stdoutData = '';
    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    // Handle errors
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`);
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({
          error: `Python script exited with code ${code}`,
          details: stdoutData
        });
      }
  const imageUrls = [
  `/outputs/${uniqueIdentifier}_Spectral_Centroid_Bandwidth.jpg`
  ];
res.status(200).json({ images: imageUrls });

    });

  } catch (err) {
    console.error('Error handling the request:', err);
    res.status(500).send(err);
  }
});
app.use('/outputs', express.static(path.join(__dirname, 'outputs')));



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
