import { useContext } from 'react';
import { formatDate } from '../utils/Utils';
import PatientHospitalProfileContext from './PatientHospitalProfileContext';

const UserDetails = ({style}) => {
  const { patientDetails } = useContext(PatientHospitalProfileContext);
  const { hospital_no, mobile_number, email, dob, sex } = patientDetails[0];

  return (
    <>
      <ul className={`font-sen ${style}`}>
        <li>
          <span className='font-semibold'>Hospital No:&nbsp;</span>
          <span className='text-gray-500'>{hospital_no}</span>
        </li>
        <li>
          <span className='font-semibold'>Sex:&nbsp;</span>
          <span className='text-gray-500'>{sex}</span>
        </li>
        <li>
          <span className='font-semibold'>Date of Birth:&nbsp;</span>
          <span className='text-gray-500'>{formatDate(dob)}</span>
        </li>
        <li>
          <span className='font-semibold'>Mobile Number:&nbsp;</span>
          <span className='text-gray-500'>{mobile_number}</span>
        </li>
        <li>
          <span className='font-semibold'>Email:&nbsp;</span>
          <span className='text-gray-500'>{email}</span>
        </li>
      </ul>
    </>
  );
};

export default UserDetails;
