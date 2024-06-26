## Project Description 📝
This is the first version of a project that aims to build a small system that consists of the following pages:

1. Form Page 📝:
   - Fields: name, email, phone number, profile image, password, type (student, graduate, employed)

2. Login Page 🔐:
   - Fields: email, password
   - Accessible only to the admin (you can define the email and password beforehand)

Once the admin logs in, the system will display all the results submitted through the user form in a table. The table will have the following functionalities:

- Sorting 🔄: Columns in the table can be sorted.
- Filtering 🔍: Admin can apply filters based on the user type. For example, selecting "student" will display only the records of students.
- Profile Images 🖼️: The table will display profile images. Clicking on an image will open it in a separate tab.

## Technologies Used 💻

This project is developed using the MERN stack:

- MongoDB 🍃: A NoSQL database used to store user form data.
- Express.js 🚂: A web application framework for building APIs and handling server-side logic.
- React.js ⚛️: A JavaScript library for building user interfaces.
- Node.js 🟢: A JavaScript runtime used for server-side development.

## ScreenShots 📷

1. Admin Registration Page
  ![image](https://github.com/Samah022/phaseOne-mern-project/assets/97039075/ef3b5ae0-3b09-485c-acec-e97eecfb948f)

2. Admin Login Page
  ![image](https://github.com/Samah022/phaseOne-mern-project/assets/97039075/f03d1879-8a47-4dd3-96a7-03cba34f00c8)

3. User Registration Page
   ![image](https://github.com/Samah022/phaseOne-mern-project/assets/97039075/ec2157fd-359d-43fa-84dd-f2c9c07302ab)

4. User Information Page
   ![image](https://github.com/Samah022/phaseOne-mern-project/assets/97039075/42372ca9-d912-482d-8030-1482741ac794)


## Setup and Installation ⚙️

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies by running the following command:
   ```
   npm install
   ```
4. Set up the MongoDB connection by providing the appropriate credentials in the project's configuration file.
5. Start the server by running the following command:
   ```
   npm start
   ```
6. Open a web browser and visit `http://localhost:3000` to access the application.
