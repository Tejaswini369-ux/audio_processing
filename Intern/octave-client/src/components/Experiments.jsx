import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Experiments = () => {
  const [expandedItems, setExpandedItems] = useState([]);

  const handleItemClick = (index) => {
    setExpandedItems((prevExpandedItems) =>
      prevExpandedItems.includes(index)
        ? prevExpandedItems.filter(item => item !== index)
        : [...prevExpandedItems, index]
    );
  };

  const experimentsData = [
    {
      title: 'Audio synthesis using the Differential DSP library',
      details: [
        { text: 'Extracting the amplitude envelope of the different audio files.', link: '/exps/4a' },
        { text: 'Extraction of RMS Energy and Zero Crossing Rate features of different audio files.', link: '/exps/4b' },
        { text: 'Determination of the Amplitude and Phase Spectrum of different audio files.', link: '/exps/4c' },
        { text: 'Extraction of various spectrograms from different audio files.', link: '/exps/4d' },
        { text: 'Extraction of MEL Spectrograms from different audio files.', link: '/exps/4e' },
        { text: 'Extracting Mel-Frequency Cepstral Coefficients from different audio files.', link: '/exps/4f' },
        { text: 'Computation of Band Energy Ratio from different audio files.', link: '/exps/4g' },
        { text: 'Extracting Spectral Centroid and Bandwidth from different audio files.', link: '/exps/4h' }
      ]
    }
  ];

  
  return (
    <div>
    <ol className="list-decimal font-serif">
      {experimentsData.map((experiment, index) => (
        <li key={index} className="mb-2 text-sm">
          <div className='font-semibold cursor-pointer text-base' onClick={() => handleItemClick(index)}>
            {experiment.title}
          </div>
          {expandedItems.includes(index) && (
            <ol className="list-[lower-alpha] ml-6 mt-2">
              {experiment.details.map((detail, subIndex) => (
                <li key={subIndex} className="mb-1">
                  <Link to={detail.link} className="hover:underline text-blue-600 hover:text-orange-500">
                    {detail.text}
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </li>
      ))}
    </ol>
  </div>
  )
}

export default Experiments
