import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import Modal from '../components/Modal';
import PatientProfiles from '../components/PatientProfiles';
import yarysaLogo from '../assets/yarysaLogo.svg';
import '../components/main.css';

const LoginPage = () => {
  const modalRef = useRef(null);
  const [profile, setProfile] = useState(null);

  const handleCloseModal = () => modalRef.current.close();

  return (
    <section className='h-screen'>
      <figure className='semi-circle'>
        <img src={yarysaLogo} alt='yarysa logo' />
      </figure>
      <div className='semi-circle2'></div>
      <div className='semi-circle3'></div>
      <article className='grid place-content-center h-96 px-4 mt-4'>
        <div>
          <h2 className='text-4xl font-sen'>Login</h2>
          <p className='text-lg my-6 font-sen'>
            To login, enter the mobile number used for registration to get your
            profile
          </p>
        </div>
        <Formik
          initialValues={{ mobile_number: '', terms_and_conditions: false }}
          validate={(value) => {
            const errors = {};
            if (!value.mobile_number) {
              errors.mobile_number = 'Required';
            } else if (!/^\d{10}$/i.test(value.mobile_number)) {
              errors.mobile_number = 'Invalid mobile_number';
            }

            if (!value.terms_and_conditions) {
              errors.terms_and_conditions = 'Required';
            }
            return errors;
          }}
          onSubmit={(value, action) => {
            axios
              .get(
                `http://[::1]:3000/api/v1/patients/sign_in?mobile_number=${value.mobile_number}`
              )
              .then((response) => {
                const data = response.data;
                setProfile(data);
                action.resetForm();
                modalRef.current.showModal();
              })
              .catch((error) => {
                toast.error(error.response.data.message, {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                action.setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className='flex flex-col'>
              <div className='flex flex-col'>
                <label htmlFor='mobile_number' className='text-gray-500'>
                  Phone number
                </label>
                <Field
                  id='mobile_number'
                  type='mobile_number'
                  name='mobile_number'
                  placeholder='Enter your phone number'
                  className={`border-2 border-gray-500 rounded-full p-4 mb-2 ${
                    errors.mobile_number && touched.mobile_number
                      ? 'border-red-700'
                      : ''
                  }`}
                />
                <ErrorMessage
                  name='mobile_number'
                  component='div'
                  className='text-red-700'
                />
              </div>

              <div className='flex items-center'>
                <Field id='check' type='checkbox' name='terms_and_conditions' />
                <label htmlFor='check'>
                  &nbsp;I agree to the terms and policy of{' '}
                  <span className='text-green-500'>Yarysa</span>
                </label>
              </div>
              <ErrorMessage
                name='terms_and_conditions'
                component='div'
                className='text-red-700 mb-2'
              />

              <button
                type='submit'
                disabled={isSubmitting}
                className={`border-2 ${
                  isSubmitting
                    ? 'bg-green-300'
                    : 'bg-green-500 hover:bg-green-600'
                } text-white rounded-full p-4 mb-4 mt-8 font-medium text-lg duration-300  hover:-translate-y-1`}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
        {
          <Modal
            modalRef={modalRef}
            handleCloseModal={handleCloseModal}
            title='Select Profile'
          >
            <PatientProfiles profile={profile} />
          </Modal>
        }
      </article>
      <ToastContainer />
    </section>
  );
};

export default LoginPage;
