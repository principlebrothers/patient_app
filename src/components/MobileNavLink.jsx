import { GoHomeFill } from 'react-icons/go';
import { FaBook } from 'react-icons/fa6';
import { VscAccount } from 'react-icons/vsc';
import DynamicNavLink from './DynamicNavLink';

const MobileNavLink = ({ patientId }) => {
  return (
    <>
      <DynamicNavLink to={`/dashboard/${patientId}`}>
        <GoHomeFill />
        <span className='text-sm'>Home</span>
      </DynamicNavLink>
      <DynamicNavLink to={`/dashboard/${patientId}/appointments`}>
        <FaBook />
        <span className='text-sm'>Appointment</span>
      </DynamicNavLink>
      <DynamicNavLink to={`#`}>
        <VscAccount />
        <span className='text-sm'>Account</span>
      </DynamicNavLink>
    </>
  );
};

export default MobileNavLink;
