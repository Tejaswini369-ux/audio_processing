import React from 'react';
import { Link } from 'react-router-dom';

const Experiments = () => {
  const experimentsData = [
    { text: 'Extracting the amplitude envelope of the different audio files.', link: '/exps/a' },
    { text: 'Extraction of RMS Energy and Zero Crossing Rate features of different audio files.', link: '/exps/b' },
    { text: 'Determination of the Amplitude and Phase Spectrum of different audio files.', link: '/exps/c' },
    { text: 'Extraction of various spectrograms from different audio files.', link: '/exps/d' },
    { text: 'Extraction of MEL Spectrograms from different audio files.', link: '/exps/e' },
    { text: 'Extracting Mel-Frequency Cepstral Coefficients from different audio files.', link: '/exps/f' },
    { text: 'Computation of Band Energy Ratio from different audio files.', link: '/exps/g' },
    { text: 'Extracting Spectral Centroid and Bandwidth from different audio files.', link: '/exps/h' }
  ];

  return (
    <div>
      <ol className="list-decimal font-serif">
        {experimentsData.map((item, index) => (
          <li key={index} className="mb-2 text-sm">
            <Link
              to={item.link}
              className="font-semibold text-base text-blue-600 hover:underline hover:text-orange-500"
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Experiments;
