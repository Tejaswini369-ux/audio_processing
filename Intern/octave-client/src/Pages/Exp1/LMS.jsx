import React from 'react'

const LMS = () => {
  return (
    <div>
          <div className='flex flex-col'>
              <p>Select CSV file</p>
              <div>
                  <button type="file" className='bg-blue-button rounded-lg px-3 py-1'>Select file</button>
                  <p>output.csv</p>
              </div>
              
      </div>
    </div>
  )
}

export default LMS
