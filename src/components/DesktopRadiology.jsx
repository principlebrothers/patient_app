import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Hourglass } from 'react-loader-spinner';
import { LuUserCircle } from 'react-icons/lu';
import axios from 'axios';
import noMedAvailable from '../assets/404.svg';
import Button from '../components/Button';
import { formatDate } from '../utils/Utils';

const DesktopRadiology = ({ patientId }) => {
  const [selectedDate, setSelectedDate] = useState({
    startDate: '',
    endDate: '',
  });

  const [limit, setLimit] = useState(9);
  const [clicked, setClicked] = useState(false);

  const { data, isLoading, error } = useQuery(
    ['radiology', selectedDate.startDate, selectedDate.endDate],
    async () => {
      let url =
        selectedDate.startDate && selectedDate.endDate
          ? `http://[::1]:3000/api/v1/patients/${patientId}/radiology_reports?start_date=${selectedDate.startDate}&end_date=${selectedDate.endDate}`
          : `http://[::1]:3000/api/v1/patients/${patientId}/radiology_reports`;

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

  const totalRadiologyReports = data?.length || 0;

  const handleViewAll = () => {
    setClicked(true);
    setLimit(totalRadiologyReports);
  };

  const handleViewLess = () => {
    setClicked(false);
    setLimit(9);
  };

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
        {isLoading ? (
          <div className='grid place-content-center h-96'>
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
              alt='Radiology report not available'
              className='w-60 h-60 mx-auto'
            />
            <figcaption>{error.response.data.message}</figcaption>
          </figure>
        ) : (
          data?.slice(0, limit)?.map((radiology_report) => (
            <article
              key={radiology_report.id}
              className='flex flex-col gap-4 mb-3 rounded-md shadow-md p-3 border border-gray-200 bg-gray-100'
            >
              <div>
                <h3 className='font-sen font-semibold text-lg'>
                  {radiology_report.service_name}
                </h3>
                <p className='text-md text-gray-500 font-sen'>
                  Uploaded {formatDate(radiology_report.uploaded_date)}
                </p>
              </div>
              <div className='flex items-center justify-between flex-wrap gap-2'>
                <div className='flex flex-col'>
                  <small className='text-gray-600 font-sen'>Ordered by</small>
                  <div className='flex gap-1 items-center'>
                    <LuUserCircle className='bg-gray-600 text-white rounded-full text-xl' />
                    <p className='text-gray-600 font-sen text-lg'>
                      {'Dr. John Doe'}
                    </p>
                  </div>
                </div>
                <Link
                  to={radiology_report.url}
                  target='_blank'
                  className='font-sen font-semibold text-gray-600 rounded-full py-1 px-6 bg-white border border-gray-400 hover:bg-yarysa-primary hover:text-white duration-300'
                >
                  View report
                </Link>
              </div>
            </article>
          ))
        )}
        <div
          className={`flex items-center justify-center gap-4 py-4 ${
            totalRadiologyReports <= 9 && 'hidden'
          }`}
        >
          {clicked ? (
            <Button
              type={'button'}
              onClick={handleViewLess}
              className={'font-sen font-semibold text-yarysa-primary'}
            >
              View less
            </Button>
          ) : (
            <Button
              type={'button'}
              onClick={handleViewAll}
              className={'font-sen font-semibold text-yarysa-primary'}
            >
              View more
            </Button>
          )}
        </div>
      </article>
    </>
  );
};

export default DesktopRadiology;
