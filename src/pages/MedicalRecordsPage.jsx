import { useState, useContext } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import MedicalRecord from '../components/MedicalRecord';

const MedicalRecordsPage = ({ patientId }) => {
  const [selectedDate, setSelectedDate] = useState({
    startDate: '',
    endDate: '',
  });

  const { data, isLoading, error } = useQuery(
    ['clinical_documents', selectedDate.startDate, selectedDate.endDate],
    async () => {
      const url =
        selectedDate.startDate && selectedDate.endDate
          ? `http://[::1]:3000/api/v1/patients/${patientId}/clinical_documents?start_date=${selectedDate.startDate}&end_date=${selectedDate.endDate}`
          : `http://[::1]:3000/api/v1/patients/${patientId}/clinical_documents`;

      const response = await axios.get(url);
      return response.data;
    },
    {
      retry: false,
      onError: (error) => {
        if (error.response && error.response.status === 404) {
          console.log('Handling 404 error');
        }
      },
    }
  );

  const handleDateChange = (event) => {
    setSelectedDate({
      ...selectedDate,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <section className='sticky -top-6 bg-gray-50 z-30'>
        <article className='flex items-center gap-3 flex-wrap p-2'>
          <div className='flex flex-col'>
            <label
              className='font-sen font-semibold text-gray-500'
              id='startDate'
            >
              Start date
            </label>
            <input
              type='date'
              id='startDate'
              className='font-sen text-md outline-none bg-slate-50 p-1'
              name='startDate'
              aria-label='date'
              value={selectedDate.startDate}
              onChange={handleDateChange}
            />
          </div>
          <div className='flex flex-col'>
            <label
              className='font-sen font-semibold text-gray-500'
              id='endDate'
            >
              End date
            </label>
            <input
              type='date'
              id='endDate'
              className='font-sen text-md outline-none bg-slate-50 p-1'
              name='endDate'
              aria-label='date'
              value={selectedDate.endDate}
              onChange={handleDateChange}
            />
          </div>
        </article>
        <hr className='border border-gray-200 mb-4' />
      </section>
      <article className='p-2'>
        <MedicalRecord
          medical_report={data}
          isLoading={isLoading}
          error={error}
        />
      </article>
    </>
  );
};

export default MedicalRecordsPage;
