const mongoose = require('mongoose');
const Institution = require('../models/Institutions'); // Adjust the path as needed
const connectDB = require('./db'); // Adjust the path as needed

// Sample data
const sampleInstitutions = [
  {
    institutionId: 'INST001',
    institutionName: 'Engineering Institute of Technology',
    institutionType: 'Engineering',
    departments: [
      {
        departmentName: 'Computer Science',
        years: [
          { yearNumber: 1, sections: [{ sectionName: 'A' }, { sectionName: 'B' }] },
          { yearNumber: 2, sections: [{ sectionName: 'A' }, { sectionName: 'B' }] },
          { yearNumber: 3, sections: [{ sectionName: 'A' }, { sectionName: 'B' }] },
          { yearNumber: 4, sections: [{ sectionName: 'A' }, { sectionName: 'B' }] },
        ],
      },
      {
        departmentName: 'Electrical Engineering',
        years: [
          { yearNumber: 1, sections: [{ sectionName: 'A' }, { sectionName: 'B' }] },
          { yearNumber: 2, sections: [{ sectionName: 'A' }, { sectionName: 'B' }] },
          { yearNumber: 3, sections: [{ sectionName: 'A' }, { sectionName: 'B' }] },
          { yearNumber: 4, sections: [{ sectionName: 'A' }, { sectionName: 'B' }] },
        ],
      },
    ],
    states: [
      {
        stateName: 'Tamil Nadu',
        districts: [
          {
            districtName: 'Namakkal',
            cities: [
              {
                cityName: 'Namakkal City',
                stoppings: [
                  { stopID: 'ST001', stopName: 'Stop 1', departureFromHalt: '07:00', collegeArrivalTime: '08:00', departureFromCollege: '16:00', dropTimeFromCollege: '17:00', routes: [{ routeNumber: '15', routeName: 'Salem' }, { routeNumber: '20', routeName: 'Trichy' }] },
                  { stopID: 'ST002', stopName: 'Stop 2', departureFromHalt: '07:15', collegeArrivalTime: '08:15', departureFromCollege: '16:15', dropTimeFromCollege: '17:15', routes: [{ routeNumber: '15', routeName: 'Salem' }] },
                ],
                routes: [
                  { routeNumber: '15', routeName: 'Salem', sittingCapacity: 40, standingCapacity: 15, driverId: 'DRV001' },
                  { routeNumber: '20', routeName: 'Trichy', sittingCapacity: 30, standingCapacity: 10, driverId: 'DRV002' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    institutionId: 'INST002',
    institutionName: 'Arts and Science College',
    institutionType: 'Arts',
    departments: [
      {
        departmentName: 'English Literature',
        years: [
          { yearNumber: 1, sections: [{ sectionName: 'A' }, { sectionName: 'B' }] },
          { yearNumber: 2, sections: [{ sectionName: 'A' }, { sectionName: 'B' }] },
          { yearNumber: 3, sections: [{ sectionName: 'A' }, { sectionName: 'B' }] },
        ],
      },
      {
        departmentName: 'History',
        years: [
          { yearNumber: 1, sections: [{ sectionName: 'A' }, { sectionName: 'B' }] },
          { yearNumber: 2, sections: [{ sectionName: 'A' }, { sectionName: 'B' }] },
          { yearNumber: 3, sections: [{ sectionName: 'A' }, { sectionName: 'B' }] },
        ],
      },
    ],
    states: [
      {
        stateName: 'Tamil Nadu',
        districts: [
          {
            districtName: 'Salem',
            cities: [
              {
                cityName: 'Salem City',
                stoppings: [
                  { stopID: 'ST003', stopName: 'Stop 3', departureFromHalt: '07:00', collegeArrivalTime: '08:00', departureFromCollege: '16:00', dropTimeFromCollege: '17:00', routes: [{ routeNumber: '10', routeName: 'Salem Express' }] },
                  { stopID: 'ST004', stopName: 'Stop 4', departureFromHalt: '07:15', collegeArrivalTime: '08:15', departureFromCollege: '16:15', dropTimeFromCollege: '17:15', routes: [{ routeNumber: '10', routeName: 'Salem Express' }] },
                ],
                routes: [
                  { routeNumber: '10', routeName: 'Salem Express', sittingCapacity: 40, standingCapacity: 10, driverId: 'DRV003' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  // Add more institutions with similar structure and different data
];

async function insertSampleData() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Remove existing data (optional)
    await Institution.deleteMany({});

    // Insert sample data
    await Institution.insertMany(sampleInstitutions);
    console.log('Sample data inserted successfully.');

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}

insertSampleData();
