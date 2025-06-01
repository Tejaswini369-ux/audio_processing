import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Page1 from './Page1';
import Experiment4a from './Exp4a/Experiment';
import Experiment4b from './Exp4b/Experiment';
import Experiment4c from './Exp4c/Experiment';
import Experiment4d from './Exp4d/Experiment';
import Experiment4e from './Exp4e/Experiment';
import Experiment4f from './Exp4f/Experiment';
import Experiment4g from './Exp4g/Experiment';
import Experiment4h from './Exp4h/Experiment';

import { useMediaQuery } from 'react-responsive';

export default function Dashboard() {
  let { '*' : section } = useParams();
  const navigate = useNavigate();

  if (!section) {
    section = '';
  }

  const [toggleClick, setToggleClick] = useState(false);
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState(section); 
  const [exp, setExp] = useState('');
  const menuRef = useRef(null);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggleClick(false);
      }
    };

    if (toggleClick) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleClick]);

  useEffect(() => {
    if (section.startsWith('exps/4a')) {
      setExp(section.split('/')[1]);
      setActiveTab(section.split('/')[2] || '');
      setPage(1);
    } else if(section.startsWith('exps/4b')) {
      setExp(section.split('/')[1]);
      setActiveTab(section.split('/')[2] || '');
      setPage(2);
    } else if(section.startsWith('exps/4c')) {
      setExp(section.split('/')[1]);
      setActiveTab(section.split('/')[2] || '');
      setPage(3);
    } else if(section.startsWith('exps/4d')) {
      setExp(section.split('/')[1]);
      setActiveTab(section.split('/')[2] || '');
      setPage(4);
    }else if(section.startsWith('exps/4e')) {
      setExp(section.split('/')[1]);
      setActiveTab(section.split('/')[2] || '');
      setPage(5);
    }else if(section.startsWith('exps/4f')) {
      setExp(section.split('/')[1]);
      setActiveTab(section.split('/')[2] || '');
      setPage(6);
    }else if(section.startsWith('exps/4g')) {
      setExp(section.split('/')[1]);
      setActiveTab(section.split('/')[2] || '');
      setPage(7);
    }else if(section.startsWith('exps/4h')) {
      setExp(section.split('/')[1]);
      setActiveTab(section.split('/')[2] || '');
      setPage(8);
    }else {
      setPage(0);
      setActiveTab(section);
    }
  }, [section]);

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
    {label :'Contact',path:'contact'},
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
    <div className='min-h-screen flex flex-col relative'>
       <Navbar setToggleClick={setToggleClick} />
       <div className='p-4 flex flex-row flex-1'>
         <div className={`hidden md:block min-w-fit border-r-4 duration-1000 ${toggleClick ? ' md:hidden' : ''}`}>
            <ul className="px-5">
              {(page === 0 ? tabs1 : tabs2).map((tab, index) => (
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
         {isMobile && toggleClick && (
        <div ref={menuRef} className="fixed md:hidden bg-slate-300 block w-[90%] max-w-[500px] p-7 text-center rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <ul className="px-5">
          {(page === 0 ? tabs1 : tabs2).map((tab, index) => (
            <li key={index} className='w-full mb-1'>
              <button
                className={`hover:bg-blue-hover rounded-lg w-full text-left font-semibold text-lg p-2 ${activeTab === tab.path ? 'text-orange' : 'text-[#3e6389]'}`}
                onClick={() =>{ handleTabClick(tab.path); setToggleClick(false);}}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
        <button 
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setToggleClick(false)}
        >
          Close
        </button>
      </div>
    )}

        {page === 0 && <Page1 activeTab={activeTab} />}
        {page === 1 && <Experiment4a activeTab={activeTab} />}
        {page === 2 && <Experiment4b activeTab={activeTab} />}
        {page=== 3 && <Experiment4c activeTab={activeTab} />}
        {page ===4 && <Experiment4d activeTab={activeTab} />}
        {page ===5 && <Experiment4e activeTab={activeTab}/>}
        {page ===6 && <Experiment4f activeTab={activeTab}/>}
        {page ===7 && <Experiment4g activeTab={activeTab}/>}
        {page === 8 && <Experiment4h activeTab={activeTab}/>}
       </div>
    </div>
  );
}