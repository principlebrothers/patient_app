import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { MdClose } from 'react-icons/md';
import { TbLogout2 } from 'react-icons/tb';
import { RiArrowRightSLine } from 'react-icons/ri';
import { handleLogout } from '../utils/Utils';
import UserDetails from './UserDetails';
import Button from './Button';

import 'animate.css';

const MobileMenu = ({ handleCloseMenu, menuRef, patientId }) => {
  const navigate = useNavigate();
  const [showPatientProfile, setShowPatientProfile] = useState(false)

  const handleShowPatientDetails = () => {
    setShowPatientProfile(!showPatientProfile)
  }

  return (
    <aside
      className='h-screen fixed bg-white right-0 top-0  z-50 w-96 py-8 px-4 hidden duration-300 animate__animated animate__fadeInRight'
      ref={menuRef}
    >
      <div className='flex items-center justify-between'>
        <h3 className='font-sen font-semibold text-2xl'>Menu</h3>
        <Button
          className={'p-2 border border-yarysa-primary bg-white rounded-lg'}
          onClick={handleCloseMenu}
        >
          <MdClose className='' />
        </Button>
      </div>
      <nav className='flex flex-col gap-4 mt-4'>
        <Link
          to={`/dashboard/${patientId}/medication`}
          className={
            'font-sen text-xl text-gray-500 flex justify-between items-center bg-gray-50 px-1 border border-gray-100 hover:bg-gray-200 w-full hover:text-gray-800 py-4'
          }
        >
          <span>View Medications</span>
          <RiArrowRightSLine className='text-2xl' />
        </Link>
        <Link
          to={`/dashboard/${patientId}/laboratory`}
          className={
            'font-sen text-xl text-gray-500 flex justify-between items-center hover:text-gray-800 py-4'
          }
        >
          <span>View Labs done</span>
          <RiArrowRightSLine className='text-2xl' />
        </Link>
        <Link
          to={`/dashboard/${patientId}/radiology`}
          className={
            'font-sen text-xl text-gray-500 flex justify-between items-center hover:text-gray-800 py-4'
          }
        >
          <span>View Radiology</span>
          <RiArrowRightSLine className='text-2xl' />
        </Link>
        <Link
          to={`/dashboard/${patientId}/consultation`}
          className={
            'font-sen text-xl text-gray-500 flex justify-between items-center hover:text-gray-800 py-4'
          }
        >
          <span> View Consultations</span>
          <RiArrowRightSLine className='text-2xl' />
        </Link>
        <Link
          to={`/dashboard/${patientId}/appointments`}
          className={
            'font-sen text-xl text-gray-500 flex justify-between items-center hover:text-gray-800 py-4'
          }
        >
          <span> Appointments</span>
          <RiArrowRightSLine className='text-2xl' />
        </Link>
        <Link
          to='#'
          className={
            'font-sen text-xl text-gray-500 flex justify-between items-center hover:text-gray-800 py-4'
          }
          onClick={handleShowPatientDetails}
        >
          <span> Account Details</span>
          <RiArrowRightSLine className='text-2xl' />
        </Link>
        <UserDetails
          style={`bg-gray-100 shadow-md border-2 w-72 p-4 absolute bottom-40 left-12 rounded-md ${
            showPatientProfile ? 'block' : 'hidden'
          }`}
        />
      </nav>
      <div className='flex justify-center mt-8'>
        <Button
          className='flex items-center gap-4 text-lg border shadow-md border-gray-400 duration-300 py-1 px-2 rounded-md hover:bg-gray-700  font-semibold ml-8'
          type='button'
          onClick={()=> handleLogout(navigate)}
        >
          <TbLogout2 className='text-lg text-gray-500' />
          <span className='text-md text-gray-500'>Log out</span>
        </Button>
      </div>
    </aside>
  );
};

export default MobileMenu;
