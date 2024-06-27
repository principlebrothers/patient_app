import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import { formatDate, capitalize } from '../utils/Utils';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    position: 'relative',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridColumn: {
    flex: 1,
    padding: 5,
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  senFont: {
    fontWeight: 700,
    fontSize: 12,
  },
  subHeaderFont: {
    fontSize: 11,
  },
  fontSizeNormal: {
    fontSize: 12,
  },
  underlineText: {
    textDecoration: 'underline',
  },
  fontWeightBold: {
    fontWeight: 900,
  },
  lineHeight: {
    lineHeight: 1.5,
  },
  headerFontColor: {
    color: 'gray',
    fontWeight: 700,
    fontSize: 14,
    marginBottom: 2,
  },
  marginY: {
    marginVertical: 5,
  },
  marginLeft: {
    marginLeft: 20,
  },
  marginBottom: {
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    padding: 10,
    borderTopWidth: 3,
    borderTopStyle: 'solid',
    borderTopColor: 'linear-gradient(90deg, red, blue)',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  footerText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

const MedicalReportPDF = ({
  medicalReport,
  patientProfile,
  hospitalProfile,
}) => {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <View style={styles.gridContainer}>
            <View style={styles.gridColumn}>
              <Image
                src='/britanniaLogo.png'
                style={{ width: 80, height: 80 }}
              />
            </View>
            <View style={styles.gridColumn}>
              <Text style={styles.senFont}>info@britanniamedical.org</Text>
              <Text style={styles.senFont}>medcenterbritannia@gmail.com</Text>
              <Text style={styles.senFont}>Community 22, Tema Nii Oko Olaaya Street{' '}</Text>
            </View>
            <View style={{ ...styles.gridColumn, ...styles.textAlignRight }}>
              <Text style={styles.senFont}>+233 20 240 0733</Text>
              <Text style={styles.senFont}>
                {' '}
                +233{hospitalProfile.phone_number}{' '}
              </Text>
            </View>
          </View>
        </View>
        {patientProfile &&
          patientProfile.map((patient) => (
            <View
              style={{ ...styles.gridContainer, ...styles.section }}
              key={patient.id}
            >
              <View style={{ ...styles.gridColumn, ...styles.lineHeight }}>
                <Text style={styles.subHeaderFont}>
                  Patient Name: {`${patient.first_name} ${patient.surname}`}
                </Text>
                <Text style={styles.subHeaderFont}>
                  Date of Birth: {patient.dob}
                </Text>
                <Text style={styles.subHeaderFont}>Sex: {patient.sex}</Text>
              </View>
              <View style={{ ...styles.gridColumn, ...styles.lineHeight }}>
                <Text style={styles.subHeaderFont}>
                  Hospital Number: {patient.hospital_no}
                </Text>
                <Text style={styles.subHeaderFont}>
                  Address: {patient.address}
                </Text>
                <Text style={styles.subHeaderFont}>Email: {patient.email}</Text>
              </View>
            </View>
          ))}
        <View>
          <Text style={{ ...styles.textAlignCenter, ...styles.underlineText }}>
            Medical Report
          </Text>
          {medicalReport.map((report) => (
            <View
              key={report.id}
              style={{ ...styles.section, ...styles.marginBottom }}
            >
              <View style={styles.fontSizeNormal}>
                <Text style={styles.textAlignCenter}>
                  {formatDate(report.created_date)}
                </Text>
                <Text style={styles.headerFontColor}>Vital signs</Text>
                <Text style={styles.flexColumn}>
                  {report.vitals && (
                    <Text>
                      <Text> {report.vitals}</Text>
                    </Text>
                  )}
                  {report.basic_med_records &&
                    report.basic_med_records.map((record) => (
                      <Text key={record.id}>
                        <Text>
                          <Text style={styles.senFont}>Pressure: </Text>
                          <Text>{record.blood_pressure}{' '}</Text>
                        </Text>
                        <Text>
                          <Text style={styles.senFont}>Pulse: </Text>
                          <Text>{record.pulse_rate}{' '}</Text>
                        </Text>
                        <Text>
                          <Text style={styles.senFont}>SPO2: </Text>
                          <Text>{record.sop2}{' '}</Text>
                        </Text>
                        <Text>
                          <Text style={styles.senFont}>Temperature: </Text>
                          <Text>{record.temperature}{' '}</Text>
                        </Text>
                        <Text>
                          <Text style={styles.senFont}>Weight: </Text>
                          <Text>{record.weight}{' '}</Text>
                        </Text>
                        <Text>
                          <Text style={styles.senFont}>Height: </Text>
                          <Text>{record.height}{' '}</Text>
                        </Text>
                        <Text>
                          <Text style={styles.senFont}>Respiratory Rate: </Text>
                          <Text>{record.respiration_rate}{' '}</Text>
                        </Text>
                      </Text>
                    ))}
                </Text>
              </View>
              <Text style={{ ...styles.headerFontColor, ...styles.marginY }}>
                Clinical documents{' '}
              </Text>
              <Text style={{ ...styles.fontSizeNormal, ...styles.marginY }}>
                <Text>PC: </Text>
                <Text>{report.complaint ? report.complaint : 'n/a'}</Text>
              </Text>
              <Text style={{ ...styles.fontSizeNormal, ...styles.marginY }}>
                <Text>HPC: </Text>
                <Text>
                  {' '}
                  {report.history_complaint
                    ? report.history_complaint
                    : 'n/a'}{' '}
                </Text>
              </Text>
              <Text style={{ ...styles.fontSizeNormal, ...styles.marginY }}>
                <Text>ODQ: </Text>
                <Text>
                  {' '}
                  {report.on_direct_question
                    ? report.on_direct_question
                    : 'n/a'}{' '}
                </Text>
              </Text>
              <Text style={{ ...styles.fontSizeNormal, ...styles.marginY }}>
                <Text>PMHx: </Text>
                <Text>
                  {' '}
                  {report.past_medical_history
                    ? report.past_medical_history
                    : 'n/a'}{' '}
                </Text>
              </Text>
              <Text style={{ ...styles.fontSizeNormal, ...styles.marginY }}>
                <Text>SH: </Text>
                <Text>
                  {' '}
                  {report.social_history ? report.social_history : 'n/a'}{' '}
                </Text>
              </Text>
              <Text style={{ ...styles.fontSizeNormal, ...styles.marginY }}>
                <Text>FH: </Text>
                <Text>
                  {' '}
                  {report.family_history ? report.family_history : 'n/a'}{' '}
                </Text>
              </Text>
              <Text style={{ ...styles.fontSizeNormal, ...styles.marginY }}>
                <Text>O/E: </Text>
                <Text>
                  {' '}
                  {report.clinical_examination
                    ? report.clinical_examination
                    : 'n/a'}{' '}
                </Text>
              </Text>
              <Text style={{ ...styles.fontSizeNormal, ...styles.marginY }}>
                <Text>INV: </Text>
                <Text>
                  {' '}
                  {report.investigations ? report.investigations : 'n/a'}{' '}
                </Text>
              </Text>
              <Text style={{ ...styles.fontSizeNormal, ...styles.marginY }}>
                <Text>Allergies: </Text>
                <Text>{report.allergies ? report.allergies : 'n/a'}</Text>
              </Text>
              <View style={{ ...styles.fontSizeNormal, ...styles.marginY }}>
                <Text style={styles.headerFontColor}>Initial Dx: </Text>
                {report.old_initial_diagnosis && (
                  <Text>
                    <Text>{report.old_initial_diagnosis}</Text>
                  </Text>
                )}
                {report.initial_diagnosis &&
                  report.initial_diagnosis.map((diagnosis, index) => (
                    <Text key={index}>
                      <Text> -{diagnosis}</Text>
                    </Text>
                  ))}
              </View>
              <View style={{ ...styles.fontSizeNormal, ...styles.marginY }}>
                {report.lab_results && (
                  <>
                    <Text>
                      <Text style={styles.headerFontColor}>Lab Results </Text>
                    </Text>
                    {report.lab_results.map((lab) => (
                      <Text key={lab.id}>
                        <Text> -{lab.service_name}</Text>
                      </Text>
                    ))}
                  </>
                )}
              </View>
              <View style={{ ...styles.fontSizeNormal, ...styles.marginY }}>
                {report.radiology_results && (
                  <>
                    <Text style={styles.headerFontColor}>Radiology</Text>
                    {report.radiology_results.map((radio) => (
                      <Text key={radio.id}>
                        <Text> -{radio.service_name}</Text>
                      </Text>
                    ))}
                  </>
                )}
              </View>
              <View style={{ ...styles.fontSizeNormal, ...styles.marginY }}>
                <Text style={styles.headerFontColor}>Final Dx: </Text>
                {report.old_final_diagnosis && (
                  <Text>
                    <Text>{report.old_final_diagnosis}</Text>
                  </Text>
                )}
                {report.final_diagnosis &&
                  report.final_diagnosis.map((diagnosis, index) => (
                    <Text key={index}>
                      <Text> -{diagnosis}</Text>
                    </Text>
                  ))}
              </View>
              <Text style={{ ...styles.fontSizeNormal, ...styles.marginY }}>
                <Text style={styles.headerFontColor}>Mx: </Text>
                <Text>
                  {report.management_plan ? report.management_plan : 'n/a'}{' '}
                </Text>
              </Text>
              <View style={{ ...styles.fontSizeNormal, ...styles.marginY }}>
                <Text style={styles.headerFontColor}>Medications</Text>
                {report.medications &&
                  report.medications.map((medication) => (
                    <Text key={medication.id} style={styles.gridContainer}>
                      <Text style={styles.gridColumn}>
                        {medication.medication}{' '}
                      </Text>
                      <Text style={styles.gridColumn}>
                        <Text> Dosage&nbsp;</Text>
                        <Text> {medication.dosage}</Text>
                      </Text>
                    </Text>
                  ))}
              </View>
              <Text style={{ ...styles.fontSizeNormal, ...styles.marginY }}>
                <Text style={styles.headerFontColor}>Doctor's Name: </Text>
                <Text>Dr.&nbsp;{capitalize(report.created_by)}</Text>
              </Text>
            </View>
          ))}
        </View>
        <Text style={{ ...styles.fontSizeNormal, ...styles.marginY, ...styles.marginLeft }}>
          <Text style={styles.headerFontColor}>Doctor's Signature: </Text>
          <Text>_________________________</Text>
        </Text>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Leader in healthcare</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MedicalReportPDF;
