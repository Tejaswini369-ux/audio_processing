const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = 5000;

app.use(fileUpload());
app.use(express.static('public'));

app.post('/process', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const inputFile = req.files.file;
  const lambda = req.body.lambda;
  const M = req.body.M;
  const uploadPath = path.join(__dirname, 'uploads', inputFile.name);

  // Save the uploaded file
  inputFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Process the file with the RLS script
    const outputDir = path.join(__dirname, 'public', 'outputs');
    const command = `octave --eval "rls_denoise(${lambda}, '${uploadPath}', ${M}, '${outputDir}')"`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        return res.status(500).send(err);
      }

      // Send the URLs of the generated images
      const imageUrls = [
        '/outputs/rls_output_signal.png',
        '/outputs/rls_error_signal.png'
      ];
      res.json({ images: imageUrls });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
