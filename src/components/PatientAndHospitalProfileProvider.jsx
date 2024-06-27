import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import noMedAvailable from '../assets/404.svg';
import Button from './Button';
import PatientHospitalProfileContext from './PatientHospitalProfileContext';

const PatientAndHospitalProfileProvider = ({ children, patientId }) => {
  const navigator = useNavigate();
  const {
    data: patientDetails,
    isLoading: patientLoading,
    error: patientError,
  } = useQuery('patientDetails', async () => {
    let token = localStorage.getItem('authToken');
    const { data } = await axios.get(
      `http://[::1]:3000/api/v1/patients/${patientId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return data;
  });

  const {
    data: hospitalDetails,
    isLoading: hospitalLoading,
    error: hospitalError,
  } = useQuery('hospitalDetails', async () => {
    const token = localStorage.getItem('authToken');
    const { data } = await axios.get(`http://[::1]:3000/api/v1/settings`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  });

  if (patientLoading || hospitalLoading)
    return <div className='text-center'>Loading...</div>;
  if (patientError || hospitalError)
    return (
      <figure className='text-2xl font-sen text-red-500 text-center py-4'>
        <img
          src={noMedAvailable}
          alt='Error loading data'
          className='w-60 h-60 mx-auto'
        />
        <figcaption>Error loading data</figcaption>
        <Button
          className='bg-yarysa-primary text-white py-1 px-4 rounded-md mt-4'
          onClick={() => navigator('/login', { replace: true })}
        >
          Click to login
        </Button>
      </figure>
    );

  return (
    <PatientHospitalProfileContext.Provider
      value={{ patientDetails, hospitalDetails }}
    >
      {children}
    </PatientHospitalProfileContext.Provider>
  );
};

export default PatientAndHospitalProfileProvider;
