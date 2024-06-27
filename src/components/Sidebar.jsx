import React from 'react'
import { GoHomeFill } from 'react-icons/go';
import { FaBook } from 'react-icons/fa6';
import { VscAccount } from 'react-icons/vsc';
import { TbLogout2 } from 'react-icons/tb';
import DynamicNavLink from './DynamicNavLink';
import Button from './Button';
import yarysaLogo from '../assets/yarysaLogo.svg';
import { handleLogout } from '../utils/Utils';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ patientId }) => {
  const navigate = useNavigate();

  return (
    <aside className='h-screen w-56 duration-300 bg-yarysa-primary text-white hidden md:flex flex-col justify-between'>
      <div>
        <figure className='my-10'>
          <img src={yarysaLogo} alt='yarysa logo' className=' w-36  mx-auto' />
        </figure>
        <nav className='flex flex-col gap-4 ml-8 mr-4'>
          <DynamicNavLink
            to={`/dashboard/${patientId}`}
            className={
              'flex items-center text-lg gap-2 duration-300 py-1 px-2 rounded-md hover:bg-gray-700'
            }
          >
            <GoHomeFill className='text-2xl' />
            <span className='text-md'>Home</span>
          </DynamicNavLink>
          <DynamicNavLink
            to={`/dashboard/${patientId}/appointments`}
            className={
              'flex items-center text-lg gap-2 duration-300 py-1 px-2 rounded-md hover:bg-gray-700'
            }
          >
            <FaBook />
            <span className='text-md'>Appointment</span>
          </DynamicNavLink>
          <DynamicNavLink
            to={`#`}
            className={
              'flex items-center text-lg gap-2 duration-300 py-1 px-2 rounded-md hover:bg-gray-700'
            }
          >
            <VscAccount />
            <span className='text-md'>Account</span>
          </DynamicNavLink>
        </nav>
      </div>
      <div className='border-t-2 border-gray-500 py-4 w-full'>
        <Button className='flex items-center gap-4 text-lg duration-300 py-1 px-2 rounded-md hover:bg-gray-700  font-semibold ml-8' type='button' onClick={()=> handleLogout(navigate)}>
          <TbLogout2 className='text-lg text-gray-500' />
          <span className='text-md text-gray-500'>Log out</span>
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar