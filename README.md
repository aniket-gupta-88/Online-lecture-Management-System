# Online Lecture Management System

### Project Overview

This project is an Online Lecture Management System designed to facilitate the organization and management of lectures for educational institutions or online learning platforms. It consists of two main components: a frontend built using React and a backend developed using Express, Node.js, and MongoDB.

### Features

- **User Authentication:** The system supports two types of users: Admin and Instructor. Each user type has different permissions and access levels.
- **Admin Dashboard:** Admin users can:
  - View lectures, instructors, and courses.
  - Add new courses.
  - Assign lectures to courses and instructors, ensuring no overlapping lectures on the same day.
  - Manage instructors and their assignments.
- **Instructor Dashboard:** Instructor users can:
  - View all assigned lectures with their corresponding dates.
  - Access additional features like adding Google links for live sessions or providing notes and resources (future enhancement).

### Login Credentials

- **Admin:**
  - Username: user111
  - Password: user01
  - Role: admin
- **Instructor:**
  - Username: striverr
  - Password: striver
  - Role: instructor

### Setup Instructions

1. **Clone the Repository:** Clone this repository to your local machine.
2. **Install Dependencies:** Navigate to the frontend and backend directories and run `npm install` to install the required dependencies.
3. **Environment Variables:** Create a `.env` file in the backend directory and set the necessary environment variables, including database connection details and authentication secrets.
4. **Start the Backend Server:** In the backend directory, run `npm start` to start the backend server.
5. **Start the Frontend Server:** In the frontend directory, run `npm start` to start the frontend server.
6. **Access the Application:** Open your web browser and navigate to the appropriate URL to access the application.

### Future Enhancements

Implement additional features such as:

- Adding Google links for live sessions.
- Providing notes and resources for lectures.
- Enhancing user experience and interface design.

**Note:** Make sure to follow the setup instructions carefully to get the application up and running smoothly. Happy coding!
