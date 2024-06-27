import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';

import yarysaLogoNew from '../assets/yarysaLogoNew.svg';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Button from '../components/Button';
import { decryptId } from '../utils/Utils';
import '../components/main.css';

const confirmOTP = async (data) => {
  const token = localStorage.getItem('authToken');
  const response = await axios.post(`http://[::1]:3000/api/v1/patients/${data.id}/confirm_otp`, data, {
    headers: {
      Authorization: token,
    },
  });
  return response;
}

const AuthPage = () => {
  const { patientId } = useParams();
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const navigate = useNavigate();
  const patientID = decryptId(patientId);

  const { mutate: confirmOtpMutate } = useMutation(confirmOTP,
    {
      onSuccess: (response) => {
        const authToken = response?.data?.token;
        localStorage.setItem('authToken', authToken);
        navigate(`/dashboard/${patientId}`, { replace: true });
      },
      onError: (response) => {
        let message = ''
        if(response?.response?.status === 401) {
          message = response?.response?.data?.error;
        }
        else {
          message = response?.response?.data?.message;
        }
        alert(message);
      },
    }
  );

  const { mutate: createOtpMutate } = useMutation(
    async (patientProfile) => {
      const response = await axios.post(`http://[::1]:3000/api/v1/onetimepasswords`, patientProfile);
      return response;
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          alert('OTP sent successfully');
        }
      },
      onError: () => {
        alert('An error occurred! please try again');
      },
    }
  );

  const handleVerify = () => {
    let finalOtp = otp.join('');
    confirmOtpMutate({ id: patientID, otp: finalOtp });
  };

  const handleChange = (e, index) => {
    const otpCopy = [...otp];
    otpCopy[index] = e.target.value;
    setOtp(otpCopy);
    if (e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const handleResendOtp = () => {
    createOtpMutate({ patient_id: patientID });
    setOtp(new Array(4).fill(''));
  };

  const handleBackNavigation = () => {
    navigate('/login', {replace: true})
  }

  return (
    <section>
      <header className='relative'>
        <div className='ds'>
          <div className='semicircle'></div>
        </div>
        <div className='fs'>
          <div className='circle'></div>
          <div className='circle2'></div>
        </div>
        <Button onClick={handleBackNavigation} className='group'>
          <IoIosArrowRoundBack className='text-4xl absolute left-6 top-12 duration-300 group-hover:scale-110' />
        </Button>
        <figure className=' w-full py-14  px-20 flex justify-center rounded-b-full mb-4'>
          <img src={yarysaLogoNew} alt='Yarysa logo' />
        </figure>
      </header>
      <article className='grid place-content-center px-4'>
        <div>
          <h2 className='text-4xl font-sen'>Verify number</h2>
          <p className='text-lg my-6 font-sen'>
            Enter 4 digit PIN that was sent to your mobile number below
          </p>
        </div>
        <form>
          <div className='flex gap-6 mb-4'>
            {otp.map((data, index) => {
              return (
                <input
                  key={index}
                  type='text'
                  name='otp'
                  maxLength='1'
                  value={data}
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  className='w-16 h-16 text-4xl text-gray-500 text-center border-2 border-green-500 rounded-md'
                />
              );
            })}
          </div>
          <span>
            Didn't get a code?{' '}
            <span className='text-green-500 cursor-pointer' onClick={handleResendOtp}>
              Resend
            </span>
          </span>
          <Button
            type='button'
            className='w-full bg-green-500 text-white font-semibold font-sen text-xl py-4 rounded-full mt-12 mb-4 duration-300 hover:bg-green-600 hover:-translate-y-2'
            onClick={() => {
              handleVerify();
            }}
          >
            Verify
          </Button>
        </form>
      </article>
    </section>
  );
};

export default AuthPage;
