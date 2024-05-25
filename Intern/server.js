const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/run-octave', (req, res) => {
    const { frequency, duration } = req.body;

    // Command to run the Octave script with parameters
    const command = `octave --silent --eval "script(${frequency}, ${duration})"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send({ error: stderr });
        }

        // Read the generated CSV file and send it back to the frontend
        fs.readFile('waveform.csv', 'utf8', (err, data) => {
            if (err) {
                console.error(`read file error: ${err}`);
                return res.status(500).send({ error: 'Error reading waveform data' });
            }
            res.send({ data });
        });
    });
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
