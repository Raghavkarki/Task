

const fs = require('fs');

const completePatientRecords = JSON.parse(fs.readFileSync('complete_patient_records.json', 'utf-8'));
//for over 20 of age 
const patientsAbove20 = completePatientRecords.filter(patient => {
    const dob = new Date(patient.dob);
    const ageInMs = Date.now() - dob.getTime();
    const ageInYears = ageInMs / 1000 / 60 / 60 / 24 / 365;
    return ageInYears > 20;
});

console.log(`Number of patients above the age of 20: ${patientsAbove20.length}`);
//for female 14<>59
const femalesBelow14Over59 = completePatientRecords.filter(patient => {
    const dob = new Date(patient.dob);
    const ageInMs = Date.now() - dob.getTime();
    const ageInYears = ageInMs / 1000 / 60 / 60 / 24 / 365;
    const isFemale = patient.gender === 'female';
    return isFemale && ageInYears < 14 || ageInYears > 59;
});

console.log(`Number of females below 14 and over 59: ${femalesBelow14Over59.length}`);

//for most dignosed disease
const diseaseCounts = {};

completePatientRecords.forEach(patient => {
  const reports = patient.reports;
  reports.forEach(report => {
    const disease = report.disease;
    if (disease) { // add this check
      const name = disease;
      if (name in diseaseCounts) {
        diseaseCounts[name]++;
      } else {
        diseaseCounts[name] = 1;
      }
    }
  });
});

let mostCommonDisease = '';
let highestCount = 0;

for (const disease in diseaseCounts) {
  const count = diseaseCounts[disease];
  if (count > highestCount) {
    mostCommonDisease = disease;
    highestCount = count;
  }
}

console.log(`Most common disease: ${mostCommonDisease}, count: ${highestCount}`);


// Number of dead patients
const deadPatients = completePatientRecords.filter(patient => patient.alive === false).length;

console.log(`Number of dead patients: ${deadPatients}`);

  // Total number of children under 2
  const totalChildrenUnder2 = completePatientRecords.filter(patient => {
    const ageInMonths = Math.floor((new Date() - new Date(patient.dob)) / (1000 * 60 * 60 * 24 * 30));
    return ageInMonths < 24;
  }).length;

  

// Number of children under 2 with all vaccinations
const childrenUnder2WithAllVaccinations = completePatientRecords.filter(patient => {
  const ageInMonths = Math.floor((new Date() - new Date(patient.dob)) / (1000 * 60 * 60 * 24 * 30));
  return ageInMonths < 24 && patient.vaccination_complete === true;
}).length;



  // Percentage of children under 2 with all vaccinations complete
  const percentageUnder2WithAllVaccinations = (childrenUnder2WithAllVaccinations / totalChildrenUnder2) * 100;


  console.log(`Total number of children: ${totalChildrenUnder2}`);



  console.log(`Number of children under 2 with all vaccinations: ${childrenUnder2WithAllVaccinations}`);
  
  console.log(`Percentage of children under 2 with all vaccinations complete:${percentageUnder2WithAllVaccinations}%`);




// // Initialize counter for erroneous pregnancy reports
// let countErroneous = 0;

// // Loop through each patient in the data
// completePatientRecords.forEach(patient => {
//   // Check if patient is female and age > 18 and < 49
//   const dob = new Date(patient.dob);
//   const age = calculateAge(dob);
//   if (patient.gender === 'Female' && age > 18 && age < 49) {
//     // Loop through each report of the patient
//     patient.reports.forEach(report => {
//       // Check if report is a pregnancy report and outcome is not live birth or still birth
//       if (report.visit_type === 'delivery' && report.pregnancy_outcome !== 'live_birth' && report.pregnancy_outcome !== 'still_birth') {
//         // Increment counter for erroneous pregnancy reports
//         countErroneous++;
//       }
//     });
//   }
// });

// Print the number of erroneous pregnancy reports
// console.log(`Number of erroneous pregnancy reports: ${countErroneous}`);

// // Function to calculate age from date of birth
// function calculateAge(dob) {
//   const diffMs = Date.now() - dob.getTime();
//   const ageDate = new Date(diffMs);
//   return Math.abs(ageDate.getUTCFullYear() - 1970);
// }

let erroneousPregnancyReports = 0;
completePatientRecords.forEach(patient => {
  if (patient.gender === "Female" && patient.age > 18 && patient.age < 49) {
    let pregnancyReports = patient.reports.filter(report => report.visit_type === "delivery");
    pregnancyReports.forEach(report => {
      if (report.pregnancy_outcome === "miscarriage" || report.pregnancy_outcome === "still_birth") {
        erroneousPregnancyReports++;
      }
    });
  }
});

console.log("Number of erroneous pregnancy reports:", erroneousPregnancyReports);



// Create the JSON report
const report = {
    Number_patients_above_20: patientsAbove20.length,
    female_patients_between_14_to_59: femalesBelow14Over59.length, 
    most_common_diognosed_disease: mostCommonDisease,Number_of_most_common_diognosed_disease : highestCount,
    dead_patients: deadPatients,
    totalChildrenUnder2: totalChildrenUnder2,
    childrenUnder2WithAllVaccinations: childrenUnder2WithAllVaccinations,
    percentage_fully_vaccinated_children_under_2: percentageUnder2WithAllVaccinations,
    erroneous_pregnancy_reports: erroneousPregnancyReports
  };
  // Write the JSON report to a file
fs.writeFileSync('complete_Task.json', JSON.stringify(report, null, 2));









// console.log(`Most common disease: ${mostCommonDisease}, count: ${highestCount}`);  

// const resultsJSON = JSON.stringify(results, null, 2);


// console.log(resultsJSON);
