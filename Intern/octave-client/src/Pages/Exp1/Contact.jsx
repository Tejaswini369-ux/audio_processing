import React from 'react'

const Contact = () => {
  return (
    <div>
          <p className='font-bold'>Dr.Tharun Kumar Reddy Bollu</p>
          <ul className='list-disc'>
              <li>Assistant Professor</li>
              <li>Department of Electronics and Communication Engineering</li>
              <li>IIT Roorkee</li>
              <li>office:+91 1332285622</li>
              <li>Email: <a href='#' className='underline text-orange font-bold'>tharun.reddy@ece.iitr.ac.in</a></li>
      </ul>
      <br/>
      <p>I thank <span className='text-blue font-semibold'>Varre Tejaswini</span>,<span className='text-blue font-semibold'>Revu Kiranmayee</span>,<span className='text-blue font-semibold'>Shika Mishra</span>,<span className='text-blue font-semibold'>Shanmukha Krishna Chaitanya Munagala</span> for their significant contributions in this work.</p>
    </div>
  )
}

export default Contact
