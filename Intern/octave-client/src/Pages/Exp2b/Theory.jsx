import React from 'react'
import equation3 from './equation3.png'
import equation4 from './equation4.png'
import equation5 from './equation5.png'
import equation6 from './equation6.png'
import equation7 from './equation7.png'
import equation8 from './equation8.png'
import equation9 from './equation9.png'
import equation10 from './equation10.png'
import equation11 from './equation11.png'

const Theory = () => {
  return (
    <div className='leading-loose text-sm'>
      <p className='font-bold text-xl text-green underline'>Kalman filter With unforced dynamic model and noiseless state space model.</p>
      <p>The Kalman filter is a recursive algorithm for estimating the state of a linear dynamic system using noisy observations. his summary focuses on a specialized form of the Kalman filter applied to an unforced dynamic model with a noiseless state-space representation, as described by Sayed and Kailath (1994). 
         This model is characterized by the absence of process noise and a simplified state transition influenced by a scalar parameter. This special unforced dynamical model holds the key to the formulation of a general framework for deriving the RLS family of adaptive filtering algorithms<br /><br />
      </p>
      <p>The linear dynamical system under consideration is described by the following state-space equations::<br />
        <ol className='list-decimal'>
          <li><b>State Equation:</b></li>
          <p><i>x</i>(<i>n</i> + 1) = λ<sup>-1/2</sup> <i>x</i>(<i>n</i>), where λ is a positive real scalar.</p>
          <li><b>Measurement Equation:</b> <i>y</i>(<i>n</i>) = u<sup>H</sup> (<i>n</i>) <i>x</i>(<i>n</i>) + <i>v</i>(<i>n</i>)</li>
          <p>According to this model, the process noise is zero, and the measurement noise, denoted by the scalar vn , is a zero-mean white noise process with unit variance, as shown by</p>
          <img src={equation3} alt='equation3'/>
          <p><b>Characteristics:</b>
            <ul className='list-disc'>
              <li>Unforced Dynamics: The absence of process noise indicates no external disturbances affect the state transition.</li>
              <li>Measurement Noise: The measurement noise vn is a zero-mean white noise process with unit variance.</li>
              <li>State Transition Matrix: The state transition matrix is simplified to  λ, a scalar.
                <p><b>Initial Conditions:</b></p>
                <p>Initial State Estimate:</p>
                <img src={equation4} alt='equation4'/>
                <p>Initial Error Covariance:</p>
                <img src={equation5} alt='equation5'/>
              </li>
            </ul>
          </p>
        </ol>
      </p>
      <p><br />Given this model, the Kalman filter equations for computing the state estimates and error covariances are derived as follows:<br />
      <ol className='list-decimal'>
          <b><li>Time Update (Prediction):</li></b>
          <p>The prediction step involves estimating time n based on the state at time n-1:</p>
          <img src={equation6} alt='equation6'/>
          <p>The corresponding error covariance matrix is updated as:</p>
          <img src={equation7} alt='equation7'/>
          <b><li>Measurement Update (Correction):</li></b>
            <ul className='list-disc'>
              <p>The correction step involves updating the predicted state estimate using the measurement at time n:</p>
              <li>Kalman Gain Computation:</li>
              <img src={equation8} alt='equation8' />
              <li>Measurement Residual:</li>
              <img src={equation9} alt='equation9' />
              <li>State Estimate Update:</li>
              <img src={equation10} alt='equation10' />
              <li>Error Covariance Update:</li>
              <img src={equation11} alt='equation11' />
            </ul>
        </ol>
      </p>
      <p><br />This Kalman filter formulation for an unforced dynamic model with a noiseless state-space model provides a robust method for state estimation. The absence of process noise simplifies the state transition, while the scalar parameter λ plays a crucial role in the filter's operation. 
        This approach is particularly valuable for adaptive filtering algorithms, such as the Recursive Least Squares (RLS) algorithm, leveraging the unique properties of the unforced dynamic model to achieve efficient and accurate state estimation in the presence of measurement noise. By following the described steps, the filter continuously refines its state estimates and error covariances, ensuring optimal performance.
      </p>
      </div>
  )
}

export default Theory

