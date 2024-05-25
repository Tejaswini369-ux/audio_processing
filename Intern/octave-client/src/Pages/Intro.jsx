import React, { useState } from 'react';
import Exp from '../Pages/Introsub/Exp';

const Intro = () => {
  const [activeTab, setActiveTab] = useState('Introduction'); // State to track the active tab

  const renderContent = () => {
    switch (activeTab) {
      case 'Introduction':
        return (
          <div className=' font-serif'>
            The interactive experiments in this lab will give the students an opportunity for better understanding and learning of the basic techniques used in Adaptive Signal Processing.
          </div>
        );
      case 'Objective':
        return (
          <div className='font-serif'>
           To mathematically describe signals and understand how to process them using mathematical operations on signals.
          </div>
        );
      case 'List of experiments':
        return (
          <div>
            <Exp/>
          </div>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div className='font-serif p-2'>
      <div>
        <div className="px-5 py-5">
        </div>
        <div className="flex flex-row pb-2">
          <div className='hidden md:block w-1/4 border-r-4 border-greyy'>
            <ul className="px-5">
              <li>
                <button
                  className={`hover:bg-blue-hover rounded-lg font-semibold p-2 ${activeTab === 'Introduction' ? 'text-orange' : ''}`}
                  onClick={() => setActiveTab('Introduction')}
                >
                  Introduction
                </button>
              </li>
              <li>
                <button
                  className={`hover:bg-blue-hover rounded-lg font-semibold p-2 ${activeTab === 'Objective' ? 'text-orange' : ''}`}
                  onClick={() => setActiveTab('Objective')}
                >
                  Objective
                </button>
              </li>
              <li>
                <button
                  className={`hover:bg-blue-hover rounded-lg font-semibold p-2 ${activeTab === 'List of experiments' ? 'text-orange' : ''}`}
                  onClick={() => setActiveTab('List of experiments')}
                >
                  List of experiments
                </button>
              </li>
            </ul>
          </div>
          <div className='w-full flex flex-col items-center gap-3 px-4'>
            <div>
              <p className='font-bold  text-lg text-blue underline hover:text-green'><a href='https://www.vlab.co.in/broad-area-biotechnology-and-biomedical-engineering'>Adaptive Signal Processing</a></p>
            </div>
            <div >
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
