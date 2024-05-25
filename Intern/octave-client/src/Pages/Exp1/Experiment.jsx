import React, { useState } from 'react'
// import '../../../index.css'
import Simulation from './Simulation';

const Experiment = ({activeTab}) => {

  const renderContent = () => {
    switch (activeTab) {
      case '':
        return <div>Aim</div>;
      case 'theory':
        return <div>Theory</div>;
      case 'pretest':
        return <div>Pretest</div>;
      case 'procedure':
        return <div>Procedure</div>;
      case 'simulation':
        return <Simulation />;
      case 'post-test':
        return <div>Post-test</div>;
      case 'references':
        return <div>References</div>;
      case 'feedback':
        return <div>Feedback</div>;
      default:
        return <div></div>;
    }
  };

  return (
          <div className="flex flex-col flex-1 gap-7 font-serif py-9 ">
            <div>
              <p className="font-bold text-lg text-center text-blue underline hover:text-green">
                <a href="https://www.vlab.co.in/broad-area-biotechnology-and-biomedical-engineering">
                  Adaptive Signal Processing
                </a>
              </p>
            </div>
            <div className='pl-16 pr-6'>{renderContent()}</div>
          </div>
  )
}

export default Experiment;
