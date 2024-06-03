const express = require('express');
const path = require('path');
const multer = require("multer");
const { exec } = require('child_process');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'Outputs')));
// var upload = multer({ dest: "./Inputs" });

app.post('/rls-process', async(req, res) => {
  try {
    // if (!req.file) {
    //   return res.status(400).send('No files were uploaded.');
    // }
    console.log(req.body)
    const inputFile = req.body.file;
    const lambda = req.body.lambda;
    const M = req.body.M;
    const uploadPath = path.join('./Inputs', inputFile);
    console.log("path is :", uploadPath);

    const uniqueIdentifier = uuidv4();

    const command = `octave --eval "addpath('${__dirname}'); rls_denoise(${lambda}, '${uploadPath}', ${M}, '${uniqueIdentifier}')"`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('Error executing Octave script:', err);
        console.error('stderr:', stderr);
        return res.status(500).send(err);
      }

      // console.log('Octave script output:', stdout);
      const imageUrls = [
        `/noisy_signal_${uniqueIdentifier}.png`,
        `/desired_signal_${uniqueIdentifier}.png`,
        `/rls_output_signal_${uniqueIdentifier}.png`,
        `/rls_error_signal_${uniqueIdentifier}.png`
        
      ];
      res.status(200).json({ images: imageUrls });
    });
  } catch (err) {
    console.error('Error handling the upload:', err);
    res.status(500).send(err);
  }
});

app.post('/lms-process', async(req, res) => {
  try {
    // if (!req.file) {
    //   return res.status(400).send('No files were uploaded.');
    // }
    console.log(req.body)
    const inputFile = req.body.file;
    const mu = req.body.mu;
    const order = req.body.order;
    const experiment = req.body.experiment;
    const uploadPath = path.join('./Inputs', inputFile);
    console.log("path is :", uploadPath);

    const uniqueIdentifier = uuidv4();

    const command = `octave --eval "addpath('${__dirname}'); lms_denoise(${mu},${experiment} ,'${uploadPath}', ${order}, '${uniqueIdentifier}')"`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('Error executing Octave script:', err);
        console.error('stderr:', stderr);
        return res.status(500).send(err);
      }

      // console.log('Octave script output:', stdout);
      const imageUrls = [
        `/noisy_signal_${uniqueIdentifier}.png`,
        `/desired_signal_${uniqueIdentifier}.png`,
        `/lms_output_signal_${uniqueIdentifier}.png`,
        `/lms_error_signal_${uniqueIdentifier}.png`,
        `/msd_${uniqueIdentifier}.png`
      ];
      res.status(200).json({ images: imageUrls });
    });
  } catch (err) {
    console.error('Error handling the upload:', err);
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
