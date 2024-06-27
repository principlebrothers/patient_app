import { useQuery, useQueryClient, useMutation } from 'react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AppointmentForm = ({ patientId, appointmentId }) => {
  const queryClient = useQueryClient();
  const { data: doctors } = useQuery('doctors', async () => {
    const { data } = await axios.get(`http://[::1]:3000/api/v1/users`);
    return data;
  });

  // const { data: appointment } = useQuery(
  //   ['appointment', appointmentId],
  //   async () => {
  //     const { data } = await axios.get(
  //       `http://[::1]:3000/api/v1/appointments/${appointmentId}`
  //     );
  //     return data;
  //   },
  //   {
  //     enabled: !!appointmentId,
  //   }
  // );

  const { mutate } = useMutation(
    async (appointments) => {
      await axios.post(`http://[::1]:3000/api/v1/appointments`, appointments);
    },
    {
      onSuccess: () => {
        toast.success('Appointment successfully booked', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        queryClient.invalidateQueries('appointments');
      },
      onError: () => {
        toast.error('An error occurred! please try again', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
    }
  );

  return (
    <>
      <Formik
        initialValues={{
          app_time: '',
          description: '',
          doctor_id: '',
          patient_id: patientId,
          status: true,
          color: 'blue',
          number: '',
        }}
        validate={(value) => {
          const errors = {};
          if (!value.number) {
            errors.number = 'Required';
          } else if (!/^\d{10}$/i.test(value.number)) {
            errors.number = 'Invalid number';
          }

          if (!value.description) {
            errors.description = 'Kindly provide a reason for the appointment';
          }

          if (!value.app_time) {
            errors.app_time = 'Kindly select the appointment date';
          }

          if (!value.doctor_id) {
            errors.doctor_id = 'Select a physician';
          }
          return errors;
        }}
        onSubmit={(value, action) => {
          mutate(value);
          action.resetForm();
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className='flex flex-col'>
            <div className='flex flex-col'>
              <label htmlFor='number' className='text-gray-500'>
                Phone number
              </label>
              <Field
                id='number'
                type='text'
                name='number'
                placeholder='Enter your phone number'
                className={`border-2 border-gray-500 rounded-full p-4 mb-2 ${
                  errors.number && touched.number ? 'border-red-700' : ''
                }`}
              />
              <ErrorMessage
                name='number'
                component='span'
                className='text-red-700'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='appointment_date' className='text-gray-500'>
                Appointment Date
              </label>
              <Field
                id='appointment_date'
                type='datetime-local'
                name='app_time'
                className={`border-2 border-gray-500 rounded-full p-4 mb-2 ${
                  errors.app_time && touched.app_time ? 'border-red-700' : ''
                }`}
              />
              <ErrorMessage
                name='app_time'
                component='span'
                className='text-red-700'
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='doctor_id' className='text-gray-500'>
                Physician
              </label>
              <Field
                id='doctor_id'
                as='select'
                name='doctor_id'
                className={`border-2 border-gray-500 rounded-full p-4 mb-2 ${
                  errors.doctor_id && touched.doctor_id ? 'border-red-700' : ''
                }`}
              >
                <option value=''>Select Physician</option>
                {doctors?.length > 0 ? (
                  doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))
                ) : (
                  <option value=''>Loading doctors...</option>
                )}
              </Field>
              <ErrorMessage
                name='doctor_id'
                component='span'
                className='text-red-700'
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='description' className='text-gray-500'>
                Reason for appointment
              </label>
              <Field id='description' type='text' name='description'>
                {({ field }) => (
                  <textarea
                    {...field}
                    className={`border-2 border-gray-500 rounded-lg p-4 mb-2 ${
                      errors.description && touched.description
                        ? 'border-red-700'
                        : ''
                    }`}
                    placeholder='Enter the reason for the appointment'
                    rows={4}
                  />
                )}
              </Field>
              <ErrorMessage
                name='description'
                component='span'
                className='text-red-700 mb-2'
              />
            </div>

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
      <ToastContainer />
    </>
  );
};

export default AppointmentForm;
