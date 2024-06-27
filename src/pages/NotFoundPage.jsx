import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import invalidpage from '../assets/Non-existing-page.svg';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/login', { replace: true });
  }

  return (
    <section class='h-screen w-screen bg-gray-100 flex items-center'>
      <div class='container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700'>
        <div class='max-w-md'>
          <div class='text-5xl font-dark font-bold'>404</div>
          <p class='text-2xl md:text-3xl font-light leading-normal'>
            Sorry we couldn't find this page.{' '}
          </p>
          <p class='mb-8'>
            But dont worry, click on the button below and follow the neccessary procedures.
          </p>

          <Button className='px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700' onClick={handleNavigate}>
            Back to homepage
          </Button>
        </div>
        <div class='max-w-lg'>
          <img src={invalidpage} alt='404' />
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
