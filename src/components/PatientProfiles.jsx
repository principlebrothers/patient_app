import { NavLink } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import { BsPersonCircle } from 'react-icons/bs';
import { encryptId, decryptId } from '../utils/Utils';

const submitSelectedPatient = async (patientProfile) => {
  let response = await axios.post(
    `http://[::1]:3000/api/v1/onetimepasswords`,
    patientProfile
  );
  return response;
};

const PatientProfiles = ({ profile }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(submitSelectedPatient, {
    onSuccess: (response) => {
      if (response.status === 200) {
        let authToken = response?.data?.token;
        localStorage.setItem('authToken', authToken);
        alert(response?.data?.message);
        queryClient.invalidateQueries('patient');
      }
    },
    onError: (response) => {
      alert(response?.response?.statusText);
    },
  });

  const handleSelectedPatient = (event) => {
    const patientId = decryptId(event.target.id);
    const patientNumber = event.target.dataset.number;
    mutate({ patient_id: patientId, mobile_number: patientNumber });
  }

  return (
    <>
      {profile?.map((patient) => {
        const patientId = encryptId(patient.id);
        return (
          <NavLink
            to={`/authenticate/${patientId}`}
            key={patientId}
            className={`flex items-center justify-between gap-4 border rounded-lg shadow-md p-4 mb-3 ${(
              isActive
            ) => (isActive ? 'border-green-500' : 'border-gray-200')}`}
          >
            <div className='bg-gray-300 rounded-full p-3'>
              <BsPersonCircle className='text-4xl h-9 w-9' />
            </div>
            <div className='px-3'>
              <p className='font-semibold font-sen'>{`${patient.surname} ${patient.other_names}`}</p>
              <p className='text-gray-500 font-sen text-md'>
                Number - {patient.mobile_number}
              </p>
            </div>
            <div className='px-3'>
              <input
                type='radio'
                name='choice'
                id={patientId}
                data-number={patient.mobile_number}
                className='text-2xl appearance-none w-5 h-5 rounded-full border border-gray-400 checked:bg-green-500 checked:border-green-500 focus:outline-none'
                onClick={handleSelectedPatient}
              />
            </div>
          </NavLink>
        );
      })}
    </>
  );
};

export default PatientProfiles;
