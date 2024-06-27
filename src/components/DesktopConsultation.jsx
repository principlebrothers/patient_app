import { useQuery } from 'react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BsHospital } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
import { Hourglass } from 'react-loader-spinner';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import Button from './Button';
import { formatDate } from '../utils/Utils';
import noMedAvailable from '../assets/404.svg';

const DesktopConsultation = ({ patientId }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, error } = useQuery(
    ['consultation', selectedDate],
    async () => {
      let url = selectedDate
        ? `http://[::1]:3000/api/v1/patients/${patientId}/consultation_reports?date=${selectedDate}&page=${pageNumber}`
        : `http://[::1]:3000/api/v1/patients/${patientId}/consultation_reports?page=${pageNumber}`;
      const response = await axios.get(url);
      return response.data;
    }
  );

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const consultations = data?.data || [];
  const { page, pages } = data?.pagy || {};

  return (
    <>
      <div className='flex justify-end p-2 bg-gray-200'>
        <input
          type='date'
          className='font-sen text-lg outline-none bg-gray-100 p-1'
          aria-label='date'
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <section className='mb-20'>
        {isLoading && (
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
        )}
        {error ? (
          <figure className='text-xl font-sen text-red-500 text-center py-4'>
            <img
              src={noMedAvailable}
              alt='No consultation found'
              className='w-60 h-60 mx-auto'
            />
            <figcaption>{error.response.data.message}</figcaption>
          </figure>
        ) : (
          consultations?.map((consultation) => (
            <article
              key={consultation.id}
              className='flex items-center gap-2 rounded-md shadow-md pr-2 py-4 sm:justify-between duration-300 md:scale-95 md:hover:scale-100'
            >
              <div>
                <h3 className='font-sen font-semibold text-md'>
                  {consultation.consultation}
                </h3>
                <p className='text-md text-gray-500 font-sen'>
                  {formatDate(consultation.consultation_date)} with{' '}
                  {consultation.doctor_name}
                </p>
              </div>
              <Link to='#'>
                <IoIosArrowForward className='text-2xl text-gray-500' />
              </Link>
            </article>
          ))
        )}
        <div className='flex items-center justify-center gap-4 py-4'>
          <Button
            type={'button'}
            onClick={() => setPageNumber(pageNumber - 1)}
            className={`p-2 border border-gray-300 ${
              page === 1 ? 'hidden' : 'flex'
            } bg-yarysa-primary text-white duration-300 hover:bg-gray-300 hover:text-yarysa-primary`}
          >
            <GrLinkPrevious />
          </Button>
          <Button
            type={'button'}
            onClick={() => setPageNumber(pageNumber + 1)}
            className={`p-2 border border-gray-300 ${
              page === pages ? 'hidden' : 'flex'
            } bg-yarysa-primary text-white duration-300 hover:bg-gray-300 hover:text-yarysa-primary`}
          >
            <GrLinkNext />
          </Button>
          <span>Page {page}</span>
        </div>
      </section>
    </>
  );
};

export default DesktopConsultation;
