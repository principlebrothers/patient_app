import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Hourglass } from 'react-loader-spinner';
import { LuUserCircle } from 'react-icons/lu';
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';

import noMedAvailable from '../assets/404.svg';
import medication_icon from '../assets/medication.svg';
import Button from './Button';
import { formatDate } from '../utils/Utils';

const DesktopMedication = ({ patientId }) => {
  const [selectedDate, setSelectedDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, error } = useQuery(
    ['medications', pageNumber, selectedDate.startDate, selectedDate.endDate],
    async () => {
      const url =
        selectedDate.startDate && selectedDate.endDate
          ? `http://[::1]:3000/api/v1/patients/${patientId}/prescriptions?start_date=${selectedDate.startDate}&end_date=${selectedDate.endDate}&page=${pageNumber}`
          : `http://[::1]:3000/api/v1/patients/${patientId}/prescriptions?page=${pageNumber}`;
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

  const prescriptions = data?.data || [];
  const { page, pages } = data?.pagy || {};
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
        {isLoading ? (
          <div className='grid place-content-center'>
            <Hourglass
              visible={true}
              height='60'
              width='60'
              ariaLabel='hourglass-loading'
              wrapperStyle={{}}
              wrapperClass=''
              colors={['#306cce', '#72a1ed']}
            />
          </div>
        ) : error ? (
          <figure className='text-xl font-sen text-red-500 text-center py-4'>
            <img
              src={noMedAvailable}
              alt='No medication available'
              className='w-60 h-60 mx-auto'
            />
            <figcaption>{error.response.data.message}</figcaption>
          </figure>
        ) : (
          prescriptions &&
          prescriptions?.map((medication) => (
            <article
              key={medication.id}
              className='flex items-center gap-2 rounded-md shadow-md p-2 border border-gray-200'
            >
              <figure className=' p-2 bg-gray-200'>
                <img
                  src={medication_icon}
                  alt={medication.medication}
                  className='rounded-full'
                />
              </figure>
              <div>
                <h3 className='font-sen font-medium text-lg text-yarysa-primary'>
                  {medication.medication}
                </h3>
                <p className='text-md text-gray-600 font-sen'>
                  {formatDate(medication.prescription_date)} |{' '}
                  {medication.dosage}
                </p>
                <div className='flex gap-1 items-center'>
                  <LuUserCircle className='bg-gray-600 text-white rounded-full text-lg' />
                  <p className='text-gray-600 font-sen'>
                    {medication.prescriber}
                  </p>
                </div>
              </div>
            </article>
          ))
        )}
        <div className='flex items-center justify-center gap-4 py-4'>
          <Button
            type={'button'}
            onClick={() => setPageNumber((prev) => prev - 1)}
            className={`p-2 border border-gray-300 ${
              page <= 1 ? 'hidden' : 'flex'
            } bg-yarysa-primary text-white duration-300 hover:bg-gray-300 hover:text-yarysa-primary`}
          >
            <GrLinkPrevious />
          </Button>
          <Button
            type={'button'}
            onClick={() => setPageNumber((prev) => prev + 1)}
            className={`p-2 border border-gray-300 ${
              page === pages ? 'hidden' : 'flex'
            } bg-yarysa-primary text-white duration-300 hover:bg-gray-300 hover:text-yarysa-primary`}
          >
            <GrLinkNext />
          </Button>
          <span>Page {page}</span>
        </div>
      </article>
    </>
  );
};

export default DesktopMedication;
