import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Page1 from './Page1';
import Experiment from './Exp1/Experiment';

export default function Dashboard() {

  let { '*' : section } = useParams();
  const navigate = useNavigate();
  if (!section) {
    section = '';
  }

  const [toggleClick,setToggleClick] = useState(false);
  const [page,setPage]=useState(0);
  const [activeTab, setActiveTab] = useState(section); 

  const [exp,setExp]=useState('');

  useEffect(()=>{
    if (section.startsWith('exps/')) {
        setExp(section.split('/')[1]); 
        setActiveTab(section.split('/')[2]);
        setPage(1);
      }
      else{
        setPage(0);
        setActiveTab(section);
      }
  },[section]);

const tabs1 = [
    { label: "Introduction", path: "" },
    { label: "Objective", path: "objective" },
    { label: "List of experiments", path: "experiments" }
  ];

  const tabs2 = [
    { label: 'Aim', path: '' },
    { label: 'Theory', path: 'theory' },
    { label: 'Pretest', path: 'pretest' },
    { label: 'Procedure', path: 'procedure' },
    { label: 'Simulation', path: 'simulation' },
    { label: 'Post-test', path: 'post-test' },
    { label: 'References', path: 'references' },
    { label: 'Feedback', path: 'feedback' }
  ];
  
  const handleTabClick = (path) => {
    if (section.startsWith('exps/')) {
      navigate(`/exps/${exp}/${path}`);
    } else {
      navigate(`/${path}`);
    }
    setActiveTab(path);
  };
  

  return (
    <div className='min-h-screen flex flex-col'>
       <Navbar setToggleClick={setToggleClick} />
       <div className='p-4 flex flex-row flex-1 mt-12'>
         <div className={`hidden md:block min-w-fit border-r-4 duration-1000 ${toggleClick ? ' md:hidden' : ''}`}>
            <ul className="px-5">
              {
              (page===0?tabs1:tabs2).map((tab, index) => (
              <li key={index} className='w-full mb-1'>
                <button
                  className={`hover:bg-blue-hover rounded-lg w-full text-left font-semibold text-lg p-2 ${activeTab === tab.path ? 'text-orange' : 'text-[#3e6389]'}`}
                  onClick={() => handleTabClick(tab.path)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
            </ul>
         </div>
         {
            page===0 &&
            <Page1 activeTab={activeTab} />
         }
         {
            page===1 &&
            <Experiment activeTab={activeTab} />
         }
       </div>
    </div>
  )
}
