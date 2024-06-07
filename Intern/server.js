const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'Outputs')));

app.post('/rls-process', async(req, res) => {
  try {
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
        res.send(err);
        console.error('stderr:', stderr);
        return res.status(500).send(err);
      }

      const imageUrls = [
        `/rls_denoise_${uniqueIdentifier}.png`
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
    console.log(req.body)
    const inputFile = req.body.file;
    const mu = req.body.mu;
    const order = req.body.order;
    const uploadPath = path.join('./Inputs', inputFile);
    console.log("path is :", uploadPath);

    const uniqueIdentifier = uuidv4();

    const command = `octave --eval "addpath('${__dirname}'); lms_denoise(${mu},'${uploadPath}', ${order}, '${uniqueIdentifier}')"`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('Error executing Octave script:', err);
        res.send(err);
        console.error('stderr:', stderr);
        return res.status(500).send(err);
      }

      const imageUrls = [
        `/lms_denoise_${uniqueIdentifier}.png`
      ];
      res.status(200).json({ images: imageUrls });
    });
  } catch (err) {
    console.error('Error handling the upload:', err);
    res.status(500).send(err);
  }
});

app.post('/AR-process', async (req, res) => {
  try {
    console.log(req.body);
    const { n_steps, p, phi, sigma } = req.body;
    const uniqueIdentifier = uuidv4();
    const command = `octave --eval "addpath('${__dirname}'); AR_process(${n_steps}, ${p}, [${phi}], ${sigma}, '${uniqueIdentifier}')"`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('Error executing Octave script:', err);
        console.error('stderr:', stderr);
        return res.status(500).send(err);
      }
      const imageUrls = [
        `/ar_process_${uniqueIdentifier}.png`
      ];
      res.status(200).json({ images: imageUrls });
    });
  } catch (err) {
    console.error('Error handling the upload:', err);
    res.status(500).send(err);
  }
});

app.post('/lms_nonstationary-process', async (req, res) => {
  try {
    console.log(req.body);
    const { n, M, mu } = req.body;
    const uniqueIdentifier = uuidv4();
    const command = `octave --eval "addpath('${__dirname}'); lms_nonstationary(${n}, ${M}, ${mu},'${uniqueIdentifier}')"`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('Error executing Octave script:', err);
        console.error('stderr:', stderr);
        return res.status(500).send(err);
      }
      const imageUrls = [
        `/lms_nonstationary_${uniqueIdentifier}.png`
      ];
      res.status(200).json({ images: imageUrls });
    });
  } catch (err) {
    console.error('Error handling the upload:', err);
    res.status(500).send(err);
  }
});
app.post('/rls_nonstationary-process', async (req, res) => {
  try {
    console.log(req.body);
    const { n, lambda, N } = req.body;
    const uniqueIdentifier = uuidv4();
    const command = `octave --eval "addpath('${__dirname}'); rls_nonstationary(${n}, ${lambda}, ${N},'${uniqueIdentifier}')"`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('Error executing Octave script:', err);
        console.error('stderr:', stderr);
        return res.status(500).send(err);
      }
      const imageUrls = [
        `/rls_nonstationary_${uniqueIdentifier}.png`
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
