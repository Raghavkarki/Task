// const fs = require('fs');

// // Read patient info data from file
// const patientInfoData = fs.readFileSync('patient_info.json');
// const patientInfo = JSON.parse(patientInfoData);

// // Read patient reports data from file
// const patientReportsData = fs.readFileSync('patient_reports.json');
// const patientReports = JSON.parse(patientReportsData);

// // Merge patient reports into patient info object
// const completePatientRecords = patientInfo.map(info => {
//   const reports = patientReports.filter(report => report.patient_id === info.patient_id);
//   return { ...info, reports };
// });
const fs = require('fs');

const patientInfo = JSON.parse(fs.readFileSync('patient_info.json', 'utf-8'));
const patientReports = JSON.parse(fs.readFileSync('patient_reports.json', 'utf-8'));

const completePatientRecords = patientInfo.map(patient => {
  const reports = patientReports.filter(report => report.person_id === patient.id);
  return { ...patient, reports };
});

fs.writeFileSync('complete_patient_records.json', JSON.stringify(completePatientRecords, null , 2));




console.log('merged data written to complete_patient_records.json');

