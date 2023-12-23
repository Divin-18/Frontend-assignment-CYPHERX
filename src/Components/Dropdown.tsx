import React, { useState } from 'react';

import { useTaskContext } from './Context';

export default function Dropdown() {
  const [firstDropdownOpen, setFirstDropdownOpen] = useState(false);
  const [secondDropdownOpen, setSecondDropdownOpen] = useState(false);
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const {
    tasks,
    users,
    groupBy,
    setGroupBy,
    groupedTasks,
    sortBy,
    setSortBy,
    sortTasks,
  } = useTaskContext();

  const toggleFirstDropdown = () => {
    setFirstDropdownOpen(!firstDropdownOpen);
    setSecondDropdownOpen(false);
    setShareDropdownOpen(false);
  };

  const toggleSecondDropdown = () => {
    setSecondDropdownOpen(!secondDropdownOpen);
    setShareDropdownOpen(false);
  };

  const toggleShareDropdown = () => {
    setShareDropdownOpen(!shareDropdownOpen);
  };

  const closeSecondDropdown = () => {
    setSecondDropdownOpen(false);
  };

  const closeShareDropdown = () => {
    setShareDropdownOpen(false);
  };

  


  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded={firstDropdownOpen}
          aria-haspopup="true"
          onClick={toggleFirstDropdown}
        >
          Display
         
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            
          </svg>
          <img
                src="images/down-arrow-svgrepo-com.svg"
                alt="down arrow"
                style={{ width: '15px', height: 'auto', marginLeft: '10px' }} 
              />
        </button>
      </div>
      {firstDropdownOpen && (
        <div className="absolute left-0 z-10 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm"
              onClick={toggleSecondDropdown}
            >
            <text aria-disabled style={{ marginRight: '50px' }}>Grouping</text>
            <input style={{ width: "80px", border: "1px solid gray" 
            }}  value={groupBy}
            />
            </a>
            {secondDropdownOpen && (
             <div
             className="absolute right-0 mt-0.5 w-30 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
           >
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm" onClick={() => {setGroupBy('status');closeSecondDropdown();}}>
                    Status
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm"  onClick={() => {setGroupBy('userId');closeSecondDropdown();}}>
                    User
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm" onClick={() => {setGroupBy('priority');closeSecondDropdown();}}>
                    Priority
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm"
              onClick={toggleShareDropdown}
            >
              <text aria-disabled style={{ marginRight: '50px' }}>Ordering</text>
            <input style={{ width: "80px", border: "1px solid gray" 
            }}  value={sortBy}
            />
            </a>
            {shareDropdownOpen && (
               <div
               className="absolute right-0 mt-0.5 w-30 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
             >
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm" onClick={() => { sortTasks('priority'); closeShareDropdown(); }}>
                  Priority
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm" onClick={() => { sortTasks('title'); closeShareDropdown();  }}>
                    Title
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
function setSelectedOption(option: any) {
  throw new Error('Function not implemented.');
}

