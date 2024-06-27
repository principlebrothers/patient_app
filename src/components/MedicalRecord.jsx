import { useContext } from 'react';
import { Hourglass } from 'react-loader-spinner';
import noMedAvailable from '../assets/404.svg';
import { capitalize, formatDate } from '../utils/Utils';
import { TbFileDownload } from 'react-icons/tb';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PatientHospitalProfileContext from './PatientHospitalProfileContext';
import MedicalReportPDF from './MedicalReportPDF';

const MedicalRecord = ({ medical_report, isLoading, error }) => {
  const { patientDetails, hospitalDetails } = useContext(PatientHospitalProfileContext);

  return (
    <>
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
            alt='medical report not available'
            className='w-60 h-60 mx-auto'
          />
          <figcaption>{error.response.data.message}</figcaption>
        </figure>
      ) : (
        <article className='grid grid-cols-1 relative'>
          {medical_report.map((report) => (
            <div
              key={report.id}
              className='bg-white shadow-md rounded-md p-2 mb-6 border border-gray-300 font-sen'
            >
              <div className='border-b-2 border-gray-300 p-1 rounded-md'>
                <h2 className='text-xl font-semibold  text-gray-500 border-b-2 mb-4 pb-2'>
                  {formatDate(report.created_date)}
                </h2>
                <h3 className='text-xl font-semibold  text-green-700'>
                  Vital signs
                </h3>
                <ul className=''>
                  {report.vitals && (
                    <li>
                      <span>{report.vitals}</span>
                    </li>
                  )}
                  {report.basic_med_records &&
                    report.basic_med_records.map((record) => (
                      <li key={record.id} className='grid grid-cols-2 gap-1'>
                        <p>
                          <span className='font-semibold'>
                            Pressure: &nbsp;
                          </span>
                          <span>{record.blood_pressure}</span>
                        </p>
                        <p>
                          <span className='font-semibold'>Pulse: &nbsp;</span>
                          <span>{record.pulse_rate}</span>
                        </p>
                        <p>
                          <span className='font-semibold'>SPO2: &nbsp;</span>
                          <span>{record.sop2}</span>
                        </p>
                        <p>
                          <span className='font-semibold'>
                            Temperature: &nbsp;
                          </span>
                          <span>{record.temperature}</span>
                        </p>
                        <p>
                          <span className='font-semibold'>Weight: &nbsp;</span>
                          <span>{record.weight}</span>
                        </p>
                        <p>
                          <span className='font-semibold'>Height: &nbsp;</span>
                          <span>{record.height}</span>
                        </p>
                        <p>
                          <span className='font-semibold'>
                            Respiratory Rate: &nbsp;
                          </span>
                          <span>{record.respiration_rate}</span>
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
              <h2 className='text-xl font-semibold py-1 text-green-700'>
                Clinical documents
              </h2>
              <p className='pb-2'>
                <span className='font-semibold'>PC:&nbsp;</span>
                <span>{report.complaint ? report.complaint : 'N/A'}</span>
              </p>
              <p className='pb-2'>
                <span className='font-semibold'>HPC:&nbsp;</span>
                <span>
                  {report.history_complaint ? report.history_complaint : 'N/A'}
                </span>
              </p>
              <p className='pb-2'>
                <span className='font-semibold'>ODQ:&nbsp;</span>
                <span>
                  {report.on_direct_question
                    ? report.on_direct_question
                    : 'N/A'}
                </span>
              </p>
              <p className='pb-2'>
                <span className='font-semibold'>PMHx:&nbsp;</span>
                <span>
                  {report.past_medical_history
                    ? report.past_medical_history
                    : 'N/A'}
                </span>
              </p>
              <p className='pb-2'>
                <span className='font-semibold'>SH:&nbsp;</span>
                <span>
                  {report.social_history ? report.social_history : 'N/A'}
                </span>
              </p>
              <p className='pb-2'>
                <span className='font-semibold'>FH:&nbsp;</span>
                <span>
                  {report.family_history ? report.family_history : 'N/A'}
                </span>
              </p>
              <p className='pb-2'>
                <span className='font-semibold'>O/E:&nbsp;</span>
                <span>
                  {report.clinical_examination
                    ? report.clinical_examination
                    : 'N/A'}
                </span>
              </p>
              <p className='pb-2'>
                <span className='font-semibold'>INV:&nbsp;</span>
                <span>
                  {report.investigations ? report.investigations : 'N/A'}
                </span>
              </p>
              <p className='pb-2'>
                <span className='font-semibold'>Allergies:&nbsp;</span>
                <span>{report.allergies ? report.allergies : 'N/A'}</span>
              </p>
              <ul className='pb-2'>
                <li className='font-semibold'>Initial Dx:&nbsp;</li>
                {report.old_initial_diagnosis && (
                  <li>
                    <span>{report.old_initial_diagnosis}</span>
                  </li>
                )}
                {report.initial_diagnosis &&
                  report.initial_diagnosis.map((diagnosis, index) => (
                    <li key={index}>
                      <span>{diagnosis}</span>
                    </li>
                  ))}
              </ul>
              <ul className='mb-2'>
                {report.lab_results && (
                  <>
                    <li>
                      <span className='font-semibold'>Lab Results&nbsp;</span>
                    </li>
                    {report.lab_results.map((lab) => (
                      <li key={lab.id}>
                        <span>{lab.service_name}</span>
                      </li>
                    ))}
                  </>
                )}
              </ul>
              <ul className='mb-2'>
                {report.lab_results && (
                  <>
                    <li className='font-semibold'>Radiology&nbsp;</li>
                    {report.radiology_results.map((radio) => (
                      <li key={radio.id}>
                        <span>{radio.service_name}</span>
                      </li>
                    ))}
                  </>
                )}
              </ul>
              <ul className='mb-2'>
                <li className='font-semibold'>Final Dx:&nbsp;</li>
                {report.old_final_diagnosis && (
                  <li>
                    <span>{report.old_final_diagnosis}</span>
                  </li>
                )}
                {report.final_diagnosis &&
                  report.final_diagnosis.map((diagnosis, index) => (
                    <li key={index}>
                      <span>{diagnosis}</span>
                    </li>
                  ))}
              </ul>
              <p className='mb-2'>
                <span className='font-semibold'>Mx:&nbsp;</span>
                <span>
                  {report.management_plan ? report.management_plan : 'N/A'}
                </span>
              </p>
              <ul className='border-t-2 mt-2'>
                <li className='font-sen font-semibold text-green-700 text-lg'>
                  Medications
                </li>
                {report.medications &&
                  report.medications.map((medication) => (
                    <li
                      key={medication.id}
                      className='font-sen text-md flex gap-1 items-start justify-between border-t'
                    >
                      <span>{medication.medication}</span>
                      <p className='flex flex-col'>
                        <span className='font-semibold text-gray-600'>
                          Dosage
                        </span>
                        <span>{medication.dosage}</span>
                      </p>
                    </li>
                  ))}
              </ul>
              <p className='text-lg font-sen font-semibold py-2 border-t-2 mt-2 '>
                <span className='text-green-700'>Seen by:&nbsp;</span>
                <span>Dr.&nbsp;{capitalize(report.created_by)}</span>
              </p>
            </div>
          ))}
          <div className='flex justify-center'>
          <PDFDownloadLink
            document={
              <MedicalReportPDF
                medicalReport={medical_report}
                patientProfile={patientDetails}
                hospitalProfile={hospitalDetails}
              />
            }
            fileName='MedicalRecord.pdf'
            className={
              'border border-green-500 bg-green-500 rounded-full py-1 px-2 flex items-center justify-center w-fit gap-2 text-sm font-sen font-semibold text-white duration-300 hover:-translate-y-1 '
            }
          >
            {({ loading }) =>
              loading ? (
                'Loading document...'
              ) : (
                <>
                  <TbFileDownload />
                  Download All
                </>
              )
            }
          </PDFDownloadLink>
          </div>
        </article>
      )}
    </>
  );
};

export default MedicalRecord;
