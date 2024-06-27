import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Consultations from '../components/Consultations';
import { today } from '../utils/Utils'

const ConsultationPage = () => {
  const { patientId } = useParams();
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  return (
    <>
      <header className='relative'>
        <Link to={`/dashboard/${patientId}`} className='group'>
          <IoIosArrowRoundBack className='text-4xl absolute left-6 top-14 duration-300 group-hover:scale-110' />
        </Link>
        <p className=' w-full py-14  px-20 flex justify-center mb-4 text-2xl font-sen'>
          Consultations
        </p>
      </header>
      <div className='flex justify-between p-2'>
        <p className='flex flex-col font-sen'>
          <span className='text-2xl font-semibold'>Today</span>
          <small className='text-gray-500'>{today}</small>
        </p>
        <input
          type='date'
          className='font-sen text-lg outline-none bg-slate-50 p-1'
          aria-label='date'
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <Consultations patientId={patientId} date={selectedDate} />
    </>
  );
};

export default ConsultationPage;
