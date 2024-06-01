const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(fileUpload());
app.use(express.static('public'));

app.post('/process', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const inputFile = req.files.file;
  const lambda = req.body.lambda;
  const M = req.body.M;
  const uploadPath = path.join(__dirname, 'src', 'uploads', inputFile.name);

  // Save the uploaded file
  inputFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Ensure the output directory exists
    const outputDir = path.join(__dirname, 'public', 'outputs');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Path to the lms_denoise script
    const scriptPath = path.join(__dirname, 'lms_denoise.m');

    // Process the file with the LMS script
    const command = `octave --eval "cd('${path.dirname(scriptPath)}'); lms_denoise(${lambda}, '${uploadPath}', ${M}, '${outputDir}')"`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
        return res.status(500).send(err);
      }

      // Send the URLs of the generated images
      const imageUrls = [
        '/outputs/desired_signal.png',
        '/outputs/noisy_signal.png',
        '/outputs/lms_output_signal.png',
        '/outputs/lms_error_signal.png',
        '/outputs/msd_signal.png'
      ];
      res.json({ images: imageUrls });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
