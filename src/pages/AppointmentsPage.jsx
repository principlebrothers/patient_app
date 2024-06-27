import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Hourglass } from 'react-loader-spinner';
import { IoIosArrowRoundBack, IoIosColorPalette } from 'react-icons/io';
import { FaSquarePlus } from 'react-icons/fa6';
import noMedAvailable from '../assets/404.svg';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdDateRange } from 'react-icons/md';
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';
// import { FaEdit } from 'react-icons/fa';

import { formatDate } from '../utils/Utils';
import MobileNavLink from '../components/MobileNavLink';
import Modal from '../components/Modal';
import Button from '../components/Button';
import AppointmentForm from '../components/AppointmentForm';
import { decryptId } from '../utils/Utils';


const AppointmentsPage = () => {
  const { patientId } = useParams();
  const queryClient = useQueryClient();
  const modalRef = useRef(null);
  const editModalRef = useRef(null);
  const [appointmentID, setAppointmentID] = useState(null);
  const [selectedDate, setSelectedDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [pageNumber, setPageNumber] = useState(1);
  const patientID = decryptId(patientId);

  const { data, isLoading, error } = useQuery(
    ['appointments', pageNumber, selectedDate.startDate, selectedDate.endDate],
    async () => {
      if (selectedDate.startDate && selectedDate.endDate) {
        const { data } = await axios.get(
          `http://[::1]:3000/api/v1/patients/${patientID}/appointments?start_date=${selectedDate.startDate}&end_date=${selectedDate.endDate}&page=${pageNumber}`
        );
        return data;
      }
      const { data } = await axios.get(
        `http://[::1]:3000/api/v1/patients/${patientID}/appointments?page=${pageNumber}`
      );
      return data;
    },
    {
      retry: false,
      onError: (error) => {
        if (error.response && error.response.status === 404) {
          
        }
      },
    }
  );

  const { mutate } = useMutation(
    async (appointmentId) => {
      await axios.delete(
        `http://[::1]:3000/api/v1/appointments/${appointmentId}`
      );
    },
    {
      onSuccess: () => {
        alert('Appointment deleted successfully');
        queryClient.invalidateQueries('appointments');
      },
    }
  );

  const handleDeleteAppointment = (appointmentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this appointment?');
    if (confirmDelete) {
      mutate(appointmentId);
    }
  };


  const handleDateChange = (event) => {
    setSelectedDate({
      ...selectedDate,
      [event.target.name]: event.target.value,
    });
  };

  const handleCloseModal = () => {
    modalRef.current.close();
  };

  // const handleOpenModalForEdit = (appointmentId) => {
  //   setAppointmentID(appointmentId);
  //   editModalRef.current.showModal();
  // };

  const handleCloseModalForEdit = () => {
    editModalRef.current.close();
  };

  const handleOpenModal = () => {
    modalRef.current.showModal();
  };

  const appointments = data?.data || [];
  const { page, pages } = data?.pagy || {};

  return (
    <>
      <section className='sticky top-0 bg-gray-50 z-30'>
        <header className='relative'>
          <Link to={`/dashboard/${patientId}`} className='group'>
            <IoIosArrowRoundBack className='text-4xl absolute left-6 top-14 duration-300 group-hover:scale-110' />
          </Link>
          <p className=' w-full py-14  px-20 flex justify-center mb-4 text-2xl font-sen'>
            Appointments
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
      <article className='relative mb-20 md:mb-0'>
        <div className='flex items-center justify-end px-4 py-2'>
          <Button
            className={
              'text-yarysa-primary font-semibold flex items-center justify-end gap-2 p-2 rounded-lg border border-gray-300 duration-300 hover:-translate-y-1'
            }
            onClick={handleOpenModal}
          >
            <FaSquarePlus className='text-2xl text-yarysa-primary' />
            <span>Book Appointment</span>
          </Button>
        </div>
        {isLoading && (
          <div className='flex justify-center items-center h-96'>
            <Hourglass color='#ffb830' height={80} width={80} />
          </div>
        )}
        {error && (
          <div className='flex justify-center flex-col items-center h-96'>
            <img
              src={noMedAvailable}
              alt='Radiology report not available'
              className='w-60 h-60 mx-auto'
            />
            <p className='text-red-500 font-sen text-2xl'>
              {error.response.data.message}
            </p>
          </div>
        )}
        <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className='bg-white border border-green-300 shadow-md rounded-lg'
            >
              <p className='font-sen font-semibold text-gray-600 bg-green-100 flex gap-2 p-2 rounded-t-lg'>
                <BsFillPersonFill className='text-6xl bg-white p-2 rounded-md' />
                <span className='text-yarysa-primary font-semibold'>
                  {appointment.doctor_name}
                  <br />
                  <small className='text-gray-500'>Medical doctor</small>
                </span>
              </p>
              <p className='font-sen font-semibold text-gray-600 px-2'>
                Reason:{' '}
                <span className='text-yarysa-primary font-normal'>
                  {appointment.description}
                </span>
              </p>
              <div className='flex items-center justify-between gap-2 p-2 bg-green-100'>
                <p className='font-sen font-normal text-green-600 flex items-center gap-1'>
                  <MdDateRange className='text-lg' />
                  <span>{formatDate(appointment.appointment_date)}</span>
                </p>
                <p className='font-sen font-normal text-green-600 flex items-center gap-1'>
                  <IoIosColorPalette className='text-lg' />
                  <span>{appointment.color}</span>
                </p>
              </div>
              <div className='flex items-center justify-center gap-8 p-2 bg-green-100'>
                {/* <Button
                  type='button'
                  aria-label='Edit'
                  className={
                    'bg-white rounded-full p-2 text-center border border-green-500 group hover:bg-green-500 duration-300 font-semibold font-sen'
                  }
                  onClick={()=>handleOpenModalForEdit(appointment.id)}
                >
                  <FaEdit className='text-gray-500 group-hover:text-white' />
                  <span sr-only='Edit' />
                </Button> */}
                <Button
                  type='button'
                  aria-label='Delete'
                  className={
                    'bg-white rounded-full p-2 text-center border border-green-500 group hover:bg-red-500 duration-300 font-semibold font-sen'
                  }
                  onClick={() => handleDeleteAppointment(appointment.id)}
                >
                  <RiDeleteBin6Line className='text-red-500 group-hover:text-white' />
                  <span sr-only='Delete' />
                </Button>
              </div>
            </div>
          ))}
        </article>
        <div className='flex justify-center gap-4 p-4'>
          {page && (
            <>
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
            </>
          )}
        </div>
        <nav className='bg-gray-100 p-4 rounded-b-xl fixed w-full z-10 bottom-0 sm:hidden'>
          <div className='flex items-center gap-2 justify-evenly'>
            <MobileNavLink patientId={patientId} />
          </div>
        </nav>
      </article>
      <Modal
        modalRef={modalRef}
        handleCloseModal={handleCloseModal}
        title={'Book Appointment'}
      >
        <AppointmentForm patientId={patientID} />
      </Modal>
      <Modal
        modalRef={editModalRef}
        handleCloseModal={handleCloseModalForEdit}
        title={'Edit Appointment'}
      >
        <AppointmentForm appointmentId={appointmentID} />
      </Modal>
    </>
  );
};

export default AppointmentsPage;
