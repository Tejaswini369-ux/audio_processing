import React, { useState } from 'react'
import '../../../index.css'
import Simulation from './Simulation';

const Ex1b = () => {
  const [activeTab, setActiveTab] = useState('Aim'); 

  const renderContent = () => {
    switch (activeTab) {
      case 'Aim':
        return (
          <div>
            Aim
          </div>
        );
      case 'Theory':
        return (
          <div>
            Theory
          </div>
        );
      case 'Pretest':
        return (
          <div>
            Pretest
          </div>
        );
      case 'Procedure':
        return (
          <div>
            Procedure
          </div>
        );
      case 'Simulation':
        return (
          <div>
            <Simulation/>
          </div>
        );
      case 'Post-test':
        return (
          <div>
            Post-test
          </div>
        );
      case 'References':
        return (
          <div>
            References
          </div>
        );
      case 'Feedback':
        return (
          <div>
            Feedback
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
        <div className="flex flex-row pb-2 ">
          <div className='hidden md:block w-1/6 border-r-4 border-greyy'>
            <ul className="px-5">
              <li>
                <button
                  className={`hover:bg-blue-hover rounded-lg font-semibold p-2 ${activeTab === 'Aim' ? 'text-orange' : ''}`}
                  onClick={() => setActiveTab('Aim')}
                >
                  Aim
                </button>
              </li>
              <li>
                <button
                  className={`hover:bg-blue-hover rounded-lg font-semibold p-2 ${activeTab === 'Theory' ? 'text-orange' : ''}`}
                  onClick={() => setActiveTab('Theory')}
                >
                  Theory
                </button>
              </li>
              <li>
                <button
                  className={`hover:bg-blue-hover rounded-lg font-semibold p-2 ${activeTab === 'Pretest' ? 'text-orange' : ''}`}
                  onClick={() => setActiveTab('Pretest')}
                >
                  Pretest
                </button>
              </li>
              <li>
                <button
                  className={`hover:bg-blue-hover rounded-lg font-semibold p-2 ${activeTab === 'Procedure' ? 'text-orange' : ''}`}
                  onClick={() => setActiveTab('Procedure')}
                >
                  Procedure
                </button>
              </li>
              <li>
                <button
                  className={`hover:bg-blue-hover rounded-lg font-semibold p-2 ${activeTab === 'Simulation' ? 'text-orange' : ''}`}
                  onClick={() => setActiveTab('Simulation')}
                >
                  Simulation
                </button>
              </li>
              <li>
                <button
                  className={`hover:bg-blue-hover rounded-lg font-semibold p-2 ${activeTab === 'Post-test' ? 'text-orange' : ''}`}
                  onClick={() => setActiveTab('Post-test')}
                >
                  Post-test
                </button>
              </li>
              <li>
                <button
                  className={`hover:bg-blue-hover rounded-lg font-semibold p-2 ${activeTab === 'References' ? 'text-orange' : ''}`}
                  onClick={() => setActiveTab('References')}
                >
                  References
                </button>
              </li>
              <li>
                <button
                  className={`hover:bg-blue-hover rounded-lg font-semibold p-2 ${activeTab === 'Feedback' ? 'text-orange' : ''}`}
                  onClick={() => setActiveTab('Feedback')}
                >
                  Feedback
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
  )
}

export default Ex1b
