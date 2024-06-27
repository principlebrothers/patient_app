import { useState, createContext } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import Button from '../components/Button';
import Laboratory from '../components/Laboratory';

export const LaboratoryContext = createContext(null);

const LaboratoryPage = () => {
  const { patientId } = useParams();
  const [selectedDate, setSelectedDate] = useState({
    startDate: '',
    endDate: '',
  });

  const [limit, setLimit] = useState(9);
  const [clicked, setClicked] = useState(false);

  const { data, isLoading, error } = useQuery(
    ['laboratories', selectedDate.startDate, selectedDate.endDate],
    async () => {
      if (selectedDate.startDate && selectedDate.endDate) {
        const { data } = await axios.get(
          `http://[::1]:3000/api/v1/patients/${patientId}/lab_reports?start_date=${selectedDate.startDate}&end_date=${selectedDate.endDate}`
        );
        return data;
      }
      const { data } = await axios.get(
        `http://[::1]:3000/api/v1/patients/${patientId}/lab_reports`
      );
      return data;
    },
    { keepPreviousData: true }
  );

  const totalLabs = data?.length || 0;

  const handleViewAll = () => {
    setClicked(true);
    setLimit(totalLabs);
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
    <LaboratoryContext.Provider value={{data, isLoading, error }}>
      <section className='sticky top-0 bg-gray-50 z-30'>
        <header className='relative'>
          <Link to={`/dashboard/${patientId}`} className='group'>
            <IoIosArrowRoundBack className='text-4xl absolute left-6 top-14 duration-300 group-hover:scale-110' />
          </Link>
          <p className=' w-full py-14  px-20 flex justify-center mb-4 text-2xl font-sen'>
            Laboratories
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
        <Laboratory patientId={patientId} limit={limit} />
        <div
          className={`flex items-center justify-center gap-4 py-4 ${
            totalLabs <= 9 && 'hidden'
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
    </LaboratoryContext.Provider>
  );
};

export default LaboratoryPage;
