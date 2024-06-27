import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Hourglass } from 'react-loader-spinner';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { GrFormSchedule } from 'react-icons/gr';
import { LuUserCircle } from 'react-icons/lu';
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';

import noMedAvailable from '../assets/404.svg';
import medication_icon from '../assets/medication.svg';
import Button from '../components/Button';
import { formatDate } from '../utils/Utils';

const MedicationPage = () => {
  const { patientId } = useParams();
  const [selectedDate, setSelectedDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, error } = useQuery(
    ['medications', pageNumber, selectedDate.startDate, selectedDate.endDate],
    async () => {
      if (selectedDate.startDate && selectedDate.endDate) {
        const { data } = await axios.get(
          `http://[::1]:3000/api/v1/patients/${patientId}/prescriptions?start_date=${selectedDate.startDate}&end_date=${selectedDate.endDate}&page=${pageNumber}`
        );
        return data;
      }
      const { data } = await axios.get(
        `http://[::1]:3000/api/v1/patients/${patientId}/prescriptions?page=${pageNumber}`
      );
      return data;
    },
    { keepPreviousData: true }
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
      <section className='sticky top-0 bg-gray-50 z-30'>
        <header className='relative'>
          <Link to={`/dashboard/${patientId}`} className='group'>
            <IoIosArrowRoundBack className='text-4xl absolute left-6 top-14 duration-300 group-hover:scale-110' />
          </Link>
          <p className=' w-full py-14  px-20 flex justify-center mb-4 text-2xl font-sen'>
            Medications
          </p>
        </header>
        <article className='flex justify-end gap-4 flex-wrap p-2'>
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
              className='font-sen text-lg outline-none bg-slate-50 p-1'
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
              className='font-sen text-lg outline-none bg-slate-50 p-1'
              name='endDate'
              aria-label='date'
              value={selectedDate.endDate}
              onChange={handleDateChange}
            />
          </div>
        </article>
        <div className='flex justify-center gap-4 flex-wrap p-2'>
          <p className='text-gray-600 font-sen'>
            Start date:{' '}
            <span className='text-yarysa-primary font-semibold'>
              {selectedDate.startDate}
            </span>{' '}
            &nbsp;&nbsp;&nbsp; End date:{' '}
            <span className='text-yarysa-primary font-semibold'>
              {selectedDate.endDate}
            </span>
          </p>
        </div>
        <hr className='border border-gray-200' />
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
          data &&
          prescriptions?.map((medication) => (
            <article
              key={medication.id}
              className='flex items-center gap-2 rounded-md shadow-md p-2 border border-gray-200'
            >
              <figure className=' p-2 bg-gray-200 md:hidden'>
                <img
                  src={medication_icon}
                  alt={medication.medication}
                  className='rounded-full'
                />
              </figure>
              <div className='md:hidden aria-hidden:hidden'>
                <h3 className='font-sen font-semibold text-lg'>
                  {medication.medication}
                </h3>
                <p className='text-lg text-gray-500 font-sen flex items-center'>
                  <GrFormSchedule className='text-2xl' />
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
              {/*The code below is for desktop view */}
              <div className='hidden md:grid md:grid-cols-4 md:justify-items-center md:content-center gap-3 py-7 grow'>
                <h3 className='font-sen font-semibold text-2xl justify-self-start'>
                  {medication.medication}
                </h3>
                <p className='text-xl text-gray-500 font-sen'>
                  <span className='text-gray-500 font-sen'>Dosage:</span>{' '}
                  {medication.dosage}
                </p>
                <p className='text-xl text-gray-500 font-sen'>
                  {formatDate(medication.prescription_date)}
                </p>
                <p className='text-2xl text-gray-600 font-sen'>
                  {medication.prescriber}
                </p>
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

export default MedicationPage;
