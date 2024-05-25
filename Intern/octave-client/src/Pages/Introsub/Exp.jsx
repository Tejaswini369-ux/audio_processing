import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Exp = () => {
   const [expandedItem, setExpandedItem] = useState(null); // State to track the expanded item

  const handleItemClick = (index) => {
    if (expandedItem === index) {
      setExpandedItem(null); // Collapse if already expanded
    } else {
      setExpandedItem(index); // Expand the clicked item
    }
  };
  return (
    <div>
      <ol className="list-decimal ml-6 font-serif">
        <li className=" 1 mb-2 text-sm ">
          <div className='font-semibold'>Experiment-1</div>
                <ol className="list-[lower-alpha] ml-6 mt-2">
                  <li className="mb-1">
                    <Link to="/1a" className="hover:underline text-blue-600 hover:text-orange-500">
                      Simulation and comparative analysis of LMS and RLS algorithms using simulated as well real time bio signals. Observe the effect of various adaptation factors like step size, forgetting factor.
                    </Link>
                  </li>
                  <li className="mb-1">
                    <a href="#" className="hover:underline text-blue-600 hover:text-orange-500">
                      Simulate an Autoregressive stochastic process
                    </a>
                  </li>
                  <li className="mb-1">
                    <a href="#" className="hover:underline text-blue-600 hover:text-orange-500">
                      Detect non-stationarity in stochastic processes with LMS and RLS
                    </a>
                  </li>
                </ol>
        </li>
        <li className="2 mb-2 text-sm ">
          <div className='font-semibold'>Study and implementation of Kalman filter</div>
                <ol className="list-[lower-alpha] ml-6 mt-2">
                  <li className="mb-1">
                    <a href="#" className="hover:underline text-blue-600 hover:text-orange-500">
                       Correspondence between the initial conditions of the Kalman variables and prediction  performance 
                    </a>
                  </li>
                  <li className="mb-1">
                    <a href="#" className="hover:underline text-blue-600 hover:text-orange-500">
                      With an unforced dynamic model and noiseless state space model. 
                    </a>
                  </li>
                </ol>
        </li>
        <li className="3 mb-2 text-sm ">
          <div className='font-semibold'>Simulation of adaptive noise cancellation, interference canceling, channel equalization using  appropriate adaptive filters for various scenario and compare the performance for various other  variants  
 of these adaptive algorithms</div>
                <ol className="list-[lower-alpha] ml-6 mt-2">
                  <li className="mb-1">
                    <a href="#" className="hover:underline text-blue-600 hover:text-orange-500">
                       Implementation and analysis of Autoregressive Stochastic processes and Minimum Variance  Distortionless Beamformer using LMS and Monte-Carlo Runs.  
                    </a>
                  </li>
                  <li className="mb-1">
                    <a href="#" className="hover:underline text-blue-600 hover:text-orange-500">
                      Simulate an adaptive prediction and equalization with LMS and RLS Algorithm.
                    </a>
                  </li>
                </ol>
        </li>
        <li className="3 mb-2 text-sm font-semibold">
          <a href='#' className='hover:underline'>Audio synthesis using the Differential DSP library</a> 
        </li>
            </ol>
      </div>
  )
}

export default Exp
