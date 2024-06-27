import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Hourglass } from 'react-loader-spinner';
import { LuUserCircle } from 'react-icons/lu';
import { formatDate, capitalize } from '../utils/Utils';
import noMedAvailable from '../assets/404.svg';
import { LaboratoryContext } from '../pages/LaboratoryPage';

const Laboratory = ({ limit, patientId }) => {
  const { data, isLoading, error } = useContext(LaboratoryContext);

  return (
    <>
      {isLoading ? (
        <div className='grid place-content-center h-screen'>
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
            alt='No lab results available'
            className='w-60 h-60 mx-auto'
          />
          <figcaption>{error.response.data.message}</figcaption>
        </figure>
      ) : (
        data?.slice(0, limit)?.map((lab_report) => (
          <article
            key={lab_report.id}
            className='flex flex-col gap-4 mb-3 rounded-md shadow-md p-3 border border-gray-200 bg-gray-100'
          >
            <div className='md:hidden'>
              <h3 className='font-sen font-semibold text-lg'>
                {lab_report.service_name}
              </h3>
              <p className='text-md text-gray-500 font-sen'>
                Uploaded {formatDate(lab_report.result_date)}
              </p>
            </div>
            <div className='flex items-center justify-between flex-wrap gap-2 md:hidden'>
              <div className='flex flex-col'>
                <small className='text-gray-600 font-sen'>Ordered by</small>
                <div className='flex gap-1 items-center'>
                  <LuUserCircle className='bg-gray-600 text-white rounded-full text-xl' />
                  <p className='text-gray-600 font-sen text-lg'>
                    {capitalize(lab_report.ordered_by)}
                  </p>
                </div>
              </div>
              {lab_report.type === 'pdf' ? (
                <Link
                  to={lab_report.url}
                  target='_blank'
                  className='font-sen font-semibold text-gray-600 rounded-full py-1 px-6 bg-white border border-gray-400 hover:bg-yarysa-primary hover:text-white duration-300'
                >
                  View result
                </Link>
              ) : (
                <Link
                  to={`dashboard/${patientId}/laboratory/${lab_report.id}`}
                  className='font-sen font-semibold text-gray-600 rounded-full py-1 px-6 bg-white border border-gray-400 hover:bg-yarysa-primary hover:text-white duration-300'
                >
                  View result
                </Link>
              )}
            </div>
          </article>
        ))
      )}
    </>
  );
}

export default Laboratory;