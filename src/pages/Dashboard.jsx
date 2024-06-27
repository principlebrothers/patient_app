import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { FiUser } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoLocationOutline } from 'react-icons/io5';
import { TbFileDownload } from 'react-icons/tb';
import laboratory from '../assets/laboratory.svg';
import medication from '../assets/medication.svg';
import consultation from '../assets/consultation.svg';
import radiology from '../assets/radiology.svg';
import Button from '../components/Button';
import Consultations from '../components/Consultations';
import MobileNavLink from '../components/MobileNavLink';
import MobileMenu from '../components/MobileMenu';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { today, decryptId } from '../utils/Utils';
import Card from '../components/Card';
import DesktopLaboratory from '../components/DesktopLaboratory';
import DesktopRadiology from '../components/DesktopRadiology';
import DesktopMedication from '../components/DesktopMedication';
import DesktopConsultation from '../components/DesktopConsultation';
import Modal from '../components/Modal';
import MedicalRecordsPage from './MedicalRecordsPage';
import PatientAndHospitalProfileProvider from '../components/PatientAndHospitalProfileProvider';
import UserDetails from '../components/UserDetails';

const Dashboard = () => {
  const { patientId } = useParams();
  const menuRef = useRef();
  const modalRef = useRef(null);
  const mobileModalRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [showPatientProfile, setShowPatientProfile] = useState(false)
  const patientID = decryptId(patientId);

  const { data } = useQuery(['patient', patientID],
    async () => {
      const { data } = await axios.get(
        `http://[::1]:3000/api/v1/patients/${patientID}`
      );
      return data;
    }
  );

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleCloseMenu = () => {
    menuRef.current.style.display = 'none';
  };

  const handleDisplayMenu = () => {
    menuRef.current.style.display = 'block';
  }

  const handleOpenModal = () => {
    modalRef.current.showModal();
  }

  const handleCloseModal = () => {
    modalRef.current.close();
  }

  const handleOpenMobileModal = () => {
    mobileModalRef.current.showModal();
  }

  const handleCloseMobileModal = () => {
    mobileModalRef.current.close();
  }

  return (
    <PatientAndHospitalProfileProvider patientId={patientID}>
      <section className=' md:flex relative'>
        <Sidebar patientId={patientId} />
        <article className='bg-yarysa-primary md:bg-transparent flex-col md:flex md:flex-1 relative'>
          <article className='md:flex md:justify-between md:bg-white md:pr-6 shadow-md'>
            <div className='flex items-center justify-between p-4'>
              <div className='flex items-center gap-4'>
                <div className='bg-white rounded-full p-2 md:hidden'>
                  <FiUser className='text-4xl h-8 w-8 text-gray-400' />
                </div>
                <p className='text-white text-2xl font-sen md:text-yarysa-primary md:font-semibold'>
                  Welcome, {data && data[0].first_name}
                </p>
              </div>
              <GiHamburgerMenu
                className='text-white text-2xl md:hidden'
                onClick={handleDisplayMenu}
              />
              <MobileMenu
                handleCloseMenu={handleCloseMenu}
                menuRef={menuRef}
                patientId={patientId}
              />
            </div>
            <div className='flex items-center gap-3 bg-transparent border border-white m-4 p-2 rounded-full md:border-gray-400'>
              <IoLocationOutline className='text-white text-2xl md:text-yarysa-primary' />
              <select className='bg-transparent text-gray-400 text-xl w-full border-none outline-none font-sen md:text-yarysa-primary'>
                <option value=''>Britannia Medical Center</option>
                <option value=''>Empat Caiquo</option>
                <option value=''>Namaata</option>
              </select>
            </div>
            <div className='hidden lg:flex items-center gap-4 relative' onClick={()=> setShowPatientProfile(!showPatientProfile)}>
              <div className='bg-white border border-gray-200 rounded-full p-2'>
                <FiUser className='text-4xl h-8 w-8 text-gray-400 md:text-yarysa-primary' />
              </div>
              <p className='text-white text-2xl md:text-yarysa-primary font-sen'>
                {data && data[0].first_name}
              </p>
              <UserDetails style={`bg-white shadow-lg w-72 p-4 absolute top-20 -left-36 z-50 rounded-md ${showPatientProfile ? 'block' : 'hidden'}`} />
            </div>
          </article>
          <article className='hidden md:flex items-center py-3 justify-between gap-2 px-8 bg-gray-100 border border-gray-200'>
            <p className='flex flex-col'>
              <span className='font-bold text-3xl text-gray-700'>Today</span>
              <span className='text-xl text-gray-700'>{today}</span>
            </p>
            <Button
              className={
                'border border-green-500 bg-green-500 rounded-full py-1 px-4 flex items-center gap-2 text-xl font-sen font-semibold text-white duration-300 hover:-translate-y-1'
              }
              onClick={handleOpenModal}
            >
              <TbFileDownload />
              <span>Generate medical reports</span>
            </Button>
            <Modal
              handleCloseModal={handleCloseModal}
              modalRef={modalRef}
              title='Medical Records'
            >
              <MedicalRecordsPage patientId={patientID} />
            </Modal>
          </article>
          <article className='bg-white rounded-t-xl relative'>
            <div className='grid grid-cols-2 gap-4 p-4 bg-white rounded-t-xl md:grid-cols-4'>
              <Card
                image={laboratory}
                alt='Laboratory icon'
                title='Laboratory'
                description='Completed laboratory reports'
                bg_color='bg-blue-100'
                text_color='text-blue-500'
                border_color='border-blue-500'
                path={`/dashboard/${patientId}/laboratory`}
                children={<DesktopLaboratory patientId={patientID} />}
              />
              <Card
                image={radiology}
                alt='Radiology icon'
                title='Radiology'
                description='Completed radiology reports'
                bg_color='bg-green-300'
                text_color='text-green-600'
                border_color='border-green-600'
                path={`/dashboard/${patientId}/radiology`}
                children={<DesktopRadiology patientId={patientID} />}
              />
              <Card
                image={medication}
                alt='Medication icon'
                title='Medication'
                description='Prescribed medications'
                bg_color='bg-yarysa-medication'
                text_color='text-yarysa-medication-text'
                border_color='border-yarysa-medication-text'
                path={`/dashboard/${patientId}/medication`}
                children={<DesktopMedication patientId={patientID} />}
              />
              <Card
                image={consultation}
                alt='Consultation icon'
                title='Consultation'
                description='Completed consultations'
                bg_color='bg-yarysa-consulation'
                text_color='text-yarysa-consultation-text'
                border_color='border-yarysa-consultation-text'
                path={`/dashboard/${patientId}/consultation`}
                children={<DesktopConsultation patientId={patientID} />}
              />
            </div>
            <div className='flex justify-center my-4 md:hidden'>
              <Button
                className={
                  'border border-gray-500 rounded-full p-2 flex items-center gap-2 text-2xl font-sen font-semibold'
                }
                type='button'
                onClick={handleOpenMobileModal}
              >
                <TbFileDownload />
                <span>Generate medical reports</span>
              </Button>
              <Modal
                handleCloseModal={handleCloseMobileModal}
                modalRef={mobileModalRef}
                title='Medical Records'
              >
                <MedicalRecordsPage patientId={patientID} />
              </Modal>
            </div>
            <article className='p-4 rounded-b-xl'>
              <div className='flex items-center justify-between my-2'>
                <h3 className='text-xl font-semibold font-sen'>
                  Latest Consultation
                </h3>
                <input
                  type='date'
                  className='font-sen text-lg outline-none'
                  aria-label='date'
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
              <>
                <Consultations patientId={patientID} date={selectedDate} />
              </>
            </article>
            <nav className='bg-gray-100 p-4 rounded-b-xl fixed w-full z-10 bottom-0 sm:hidden'>
              <div className='flex items-center gap-2 justify-evenly'>
                <MobileNavLink patientId={patientId} />
              </div>
            </nav>
          </article>
          <Footer />
        </article>
      </section>
    </PatientAndHospitalProfileProvider>
  );
};

export default Dashboard;
