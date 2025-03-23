
# Job Application System

## Project Structure

This project is divided into two main folders:

- **Backend**: Manages the API and database with Node.js, Express, and MongoDB.
- **Frontend**: Manages the client-side of the application (could be React, Angular, etc.).

---

## Backend Setup

### 1. Initialize the Backend Folder

First, navigate to the backend folder and initialize a Node.js project:

```bash
npm init
```

### 2. Install Required Dependencies

Install the necessary dependencies for the backend:

```bash
npm install express mongoose nodemon jsonwebtoken bcryptjs cookie-parser dotenv
```

### 3. Create `index.js`

Inside the backend folder, create an `index.js` file, which will be the entry point for the backend server.

```bash
touch index.js
```

---

## Models

The application includes four main models to manage the data structure for users, jobs, companies, and applications. Below are the details for each model:

### 1. **User Model (userModel)**

This schema manages user data. It includes:

- **Fields**:
  - `fullname`: Full name of the user.
  - `email`: User’s email address (unique).
  - `phoneNumber`: User’s contact number.
  - `password`: User’s password (hashed).
  - `role`: Defines whether the user is a `student` (job applicant) or a `recruiter`.
  - `profile`: Additional fields such as `bio`, `skills`, `resume`, `profile photo`, and an optional `company` reference (for recruiters).

- **Relationships**:
  - The user can be associated with a company (if the role is `recruiter`).

### Example Schema:
```javascript
const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['student', 'recruiter'], 
        required: true 
    },
    profile: {
        bio: String,
        skills: [String],
        resume: String, // URL of resume file
        resumeOriginalName: String,
        company: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Company" 
        },
        Profile_Photo: { type: String, default: "" }
    }
},{timestamps: true});

export const User = mongoose.model('User', userSchema);
```

### 2. **Job Model (jobModel)**

This schema represents job postings created by recruiters.

- **Fields**:
  - `title`: Title of the job position.
  - `description`: Detailed job description.
  - `salary`: Salary offered for the position.
  - `location`: Job location.
  - `jobType`: Full-time, part-time, contract, etc.

- **Relationships**:
  - `company`: References the `Company` collection.
  - `created_by`: References the `User` collection, representing the recruiter.
  - `application`: Array of references to `Application` objects (job applications submitted).

### Example Schema:
```javascript
const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    company: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Company", 
        required: true 
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    application: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
        }
    ]
}, {timestamps: true});

export const Job = mongoose.model("Job", jobSchema);
```

### 3. **Company Model (companyModel)**

This schema is for the companies that post jobs.

- **Fields**:
  - `name`: The company's name.
  - `description`: Description of the company.
  - `website`: Company's website URL.
  - `location`: Company location.
  - `logo`: URL of the company's logo.
  - `userId`: References the `User` collection, representing the recruiter.

### Example Schema:
```javascript
const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    website: String,
    location: String,
    logo: String, // URL of company logo
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps : true});

export const Company = mongoose.model("Company", companySchema);
```

### 4. **Application Model (applicationModel)**

This schema tracks job applications.

- **Fields**:
  - `job`: References the `Job` collection.
  - `applicant`: References the `User` collection (job seeker).
  - `status`: Enum with three possible states: `'pending'`, `'accepted'`, `'rejected'`.

### Example Schema:
```javascript
const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
        required: true
    }
},{timestamps: true});

export const Application = mongoose.model("Application", applicationSchema);
```

---

## Running the Backend

To run the backend server in development mode:

1. Add a `scripts` section to your `package.json`:
   ```json
   "scripts": {
       "start": "node index.js",
       "dev": "nodemon index.js"
   }
   ```

2. Run the server using:

   ```bash
   npm run dev
   ```

The backend will be running at `http://localhost:8000`.

---

## Conclusion

This setup provides the backend infrastructure for a job application system where users can apply for jobs, and recruiters can manage job postings and applications. The data is managed through MongoDB with Mongoose, and different roles and relationships are clearly defined for users, jobs, companies, and applications.


# User Authentication System
## Features

- **User Registration**: Users can create an account with their full name, email, phone number, password, and role. Passwords are securely hashed using `bcrypt`.
- **Login**: Users can log in with their email, password, and role. The system verifies the user's credentials and issues a JWT token for session management.
- **Logout**: Users can log out by clearing the JWT token from the cookie.
- **Profile Update**: Authenticated users can update their profile information such as full name, email, phone number, bio, and skills.
- **JWT-Based Authentication**: The system uses JSON Web Tokens (JWT) for secure authentication and maintaining user sessions.

## Routes

| Method | Endpoint           | Description                | Authentication |
|--------|--------------------|----------------------------|----------------|
| POST   | `/register`         | Registers a new user        | No             |
| POST   | `/login`            | Logs in an existing user    | No             |
| GET    | `/logout`           | Logs out the user           | Yes            |
| POST   | `/profile/update`   | Updates the user profile    | Yes            |


### JWT Token
After a successful login, a JWT token is generated and stored in a cookie. The token is valid for 1 day `(expiresIn: '1d')`. The cookie is configured as `httpOnly` and `sameSite: strict` to enhance security.


# Company Management System

This system handles company registration, retrieval, and updates. Users can register their companies, view their registered companies, get details of a specific company, and update the company's information. The system is built using Node.js, Express, MongoDB, and JWT for authentication.

## Features

- **Register a Company**: Users can register a company with a unique name. A company is associated with the user's account.
- **Get All Registered Companies**: Authenticated users can view all companies they have registered.
- **Get Company by ID**: Fetches detailed information about a specific company using its ID.
- **Update Company Information**: Allows users to update the company's information such as name, description, website, and location.

## Routes

| Method | Endpoint                  | Description                           | Authentication |
|--------|---------------------------|---------------------------------------|----------------|
| POST   | `/register`                | Registers a new company               | Yes            |
| GET    | `/get`                     | Retrieves all companies for the user  | Yes            |
| GET    | `/get/:id`                 | Retrieves a company by its ID         | Yes            |
| PUT    | `/update/:id`              | Updates the company information       | Yes    

### JWT Authentication
All routes are protected by JWT-based authentication. The token is required to be passed in the `Authorization` header as a Bearer token.
#### JWT Token Structure
 - The token is generated during the login process and stored as an `httpOnly` cookie.
 - The token is verified for each protected route to ensure the user is authenticated.


 # Job Management System

This system handles job postings, retrieval of all jobs, and retrieval of specific jobs by both users and admin. It allows authorized users to post jobs, search for jobs using keywords, and get details of specific jobs. The system is built using Node.js, Express, MongoDB, and JWT authentication for security.

## Features

- **Post a Job**: Authenticated users can post a job by providing job details such as title, description, requirements, salary, location, etc.
- **Get All Jobs**: Retrieves all jobs posted on the platform. Users can search for jobs using keywords.
- **Get Job by ID**: Fetches detailed information about a specific job using its ID.
- **Get Admin Jobs**: Admins can view all the jobs they have posted

## Routes

| Method | Endpoint                  | Description                           | Authentication |
|--------|---------------------------|---------------------------------------|----------------|
| POST   | `/post`                    | Posts a new job                       | Yes            |
| GET    | `/get`                     | Retrieves all jobs (with optional search) | Yes         |
| GET    | `/get/:id`                 | Retrieves a job by its ID             | Yes            |
| GET    | `/getadminjobs`            | Retrieves all jobs posted by admin    | Yes            |

### Request Examples

#### Post a Job
```http
POST /post
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Full Stack Developer",
  "description": "Develop and maintain web applications.",
  "requirements": "JavaScript, Node.js, React",
  "salary": 70000,
  "location": "Remote",
  "jobType": "Full-time",
  "experience": "2-4 years",
  "position": "Developer",
  "companyId": "650a1b3c9f0e1a6e12b3e711"
}
```



# Job Application Management System

The Job Application Management System enables users to apply for jobs, view jobs they have applied for, and allows admins to view the applicants for their posted jobs. Additionally, admins can update the status of applications (e.g., accepted, rejected, etc.).

## Features

- **Apply for a Job**: Authenticated users can apply for specific jobs.
- **Get Applied Jobs**: Users can view all jobs they have applied for.
- **Get Applicants for a Job**: Admins can view all applicants for a specific job.
- **Update Application Status**: Admins can update the status of job applications.

## Routes

| Method | Endpoint                      | Description                                    | Authentication |
|--------|--------------------------------|------------------------------------------------|----------------|
| POST   | `/apply/:id`                   | Applies for a specific job by its ID            | Yes            |
| GET    | `/get`                         | Retrieves all jobs the user has applied for     | Yes            |
| GET    | `/:id/applicants`              | Admins retrieve all applicants for a job by job ID | Yes         |
| POST   | `/status/:id/update`           | Admin updates the status of an application by its ID | Yes         |

### Key Sections:
- **Overview** of the features and technologies used.
- **API Routes** for applying to jobs, viewing applied jobs, getting applicants, and updating application statuses.
- **Error handling** to guide developers and users.
- **Future enhancements** like notifications and role-based access control.



# Frontend Setup with React, Vite, Tailwind CSS, and Shadcn UI

This guide explains how to set up a frontend project using **React**, **Vite**, **Tailwind CSS**, and **Shadcn UI**.

## Step 1: Initialize a React Project with Vite

1. Open your terminal and run the following command to create a new Vite project with React:

    ```bash
    npm create vite@latest my-app -- --template react
    ```

2. Change into the project directory:

    ```bash
    cd my-app
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

## Step 2: Install Tailwind CSS

Shadcn UI requires **Tailwind CSS** for styling. Follow the steps to install and configure Tailwind in the Vite project.

1. Install Tailwind CSS and its dependencies:

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    ```

2. Initialize Tailwind CSS configuration:

    ```bash
    npx tailwindcss init
    ```

    This will create a `tailwind.config.cjs` file.

3. Configure **tailwind.config.cjs** by adding the following:

    ```javascript
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

4. Create a `src/index.css` file and add Tailwind’s base styles:

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

5. Import the `index.css` file into your `src/main.jsx` or `src/index.jsx` file:

    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';
    import './index.css'; // <-- Import Tailwind styles

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    ```

## Step 3: Add Shadcn UI Components

1. Install Shadcn CLI globally or use via `npx`:

    ```bash
    npx shadcn@latest init
    ```

2. Follow the setup instructions. After initialization, you can start adding Shadcn UI components. For example, to add a button component:

    ```bash
    npx shadcn add button
    ```

    Replace `button` with other components you may need (e.g., `input`, `dialog`).

## Step 4: Start the Development Server

Now that everything is set up, start the development server:

```bash
npm run dev
```
#### Open http://localhost:5173 in your browser to view your project.


# Navbar Component for Job Portal

The `Navbar` component for the Job Portal project is a navigation bar that conditionally renders content based on the user's login status. Below is a breakdown of the implementation, key features, and how to use it.

## Key Features

1. **Conditional Rendering:**
   - Displays Login and Signup buttons when the user is not logged in.
   - Displays the user's avatar with additional options (e.g., View Profile, Logout) when logged in.

2. **Lucide Icons:**
   - Uses **lucide-react** for displaying icons like `User2` and `LogOut`.

3. **Popover for User Actions:**
   - When the user is logged in, their avatar triggers a popover with options like viewing the profile or logging out.

4. **Navigation Links:**
   - The `Navbar` contains static navigation links such as `Home`, `Jobs`, and `Browser`. These links are connected to React Router for proper navigation.


## Login Page

The login page consists of a form with fields for the user's email, password, and role (Student or Recruiter). Upon submission, the form sends a POST request to the login API, and on successful login, the user is redirected to the homepage.

**Key Features:**
- Input fields for email and password.
- Radio buttons for selecting the user role (Student or Recruiter).
- Login button triggers an API call.
- Handles success and error responses using toast notifications.

## Signup Page

The signup page allows users to create an account by filling in their details, including full name, email, phone number, password, and role. Users can also upload a profile image. On form submission, a POST request is made to the registration API.

**Key Features:**
- Input fields for full name, email, phone number, password.
- Radio buttons for selecting the user role (Student or Recruiter).
- File input for profile image upload.
- Signup button triggers an API call.
- Handles success and error responses using toast notifications.

## Redux Toolkit Setup for State Management

This document outlines the steps required to set up Redux Toolkit for state management in a React application.

### Overview
Redux Toolkit simplifies the process of setting up Redux in a React application by providing tools to create slices of state, configure a store, and manage state efficiently with less boilerplate. In this setup, we demonstrate creating an authentication slice (`authSlice`) that tracks a loading state.

## Steps

### 1. Install Required Packages
To use Redux Toolkit and React-Redux in your project, install them with the following command:

```bash
npm install @reduxjs/toolkit react-redux
```

# Job Portal Home Page

This project is a **Job Portal Home Page** built using React. It consists of multiple components like a navigation bar, hero section, category carousel, and a display of the latest job postings. The main aim is to provide a clean and user-friendly interface to help users search and apply for jobs easily.

## Project Features

- **Navbar:** A responsive navigation bar with links to various sections of the site, a mobile menu, and a contact button.
- **Hero Section:** This is the main header section that introduces the site and features a search bar to help users search for their desired jobs.
- **Category Carousel:** A carousel that displays different job categories such as Frontend Developer, Backend Developer, etc.
- **Latest Jobs Section:** Displays the most recent job openings with job details like company name, job title, description, and position details.
- **Responsive Design:** The website is responsive and works well on both mobile and desktop devices.

## Components

### 1. `Home.jsx`
The main container for the homepage, responsible for rendering all the other components like Navbar, HeroSection, CategoryCarousel, LatestJobs, and Footer.

### 2. `CategoryCarousel.jsx`
Displays a horizontal scrolling carousel with various job categories. Users can click on a category to filter the job listings.

### 3. `HeroSection.jsx`
Contains the main heading, tagline, and a search input field where users can search for jobs.

### 4. `LatestJobs.jsx` & `LatestJobCards.jsx`
This section displays a grid of the latest jobs available, with each job card showing job details like company, position, and salary.

# Jobs Page

This project is a **Jobs Page** built using React, consisting of components such as a navigation bar, job filters, and a list of available jobs. The Jobs Page is designed to help users browse and filter job opportunities based on their preferences.

## Project Features

- **Navbar:** A responsive navigation bar to navigate through different sections of the platform.
- **Filter Jobs:** A filter section where users can filter jobs based on location, industry, job type, and salary.
- **Job Listings:** A list of jobs displayed as cards, each containing information about the company, job title, description, job type, salary, and more.
- **Save for Later:** Users can save jobs for later by clicking the "Save for later" button on each job card.

## Components

### 1. `Jobs.jsx`
The main container for the jobs page, responsible for rendering the `FilterCard` and the job listings. It includes mock job data and displays a list of available jobs using the `SingleJob` component.

### 2. `FilterCard.jsx`
Displays filters such as location, industry, job type, and salary. Users can select options to filter jobs based on these criteria.

### 3. `SingleJob.jsx`
Renders each individual job card with details such as the company name, job title, description, available positions, job type, and salary. It also includes buttons for viewing job details and saving the job for later.

# Browse Page

The **Browse Page** component is a feature of the job portal application that allows users to browse through a list of available job opportunities. It consists of a simple yet effective layout displaying job cards, each containing relevant information about different job postings.

## Project Features

- **Search Results Count:** Displays the total number of job results found, giving users a quick overview.
- **Job Listings:** Shows a grid layout of job cards, each rendered using the `SingleJob` component.
- **Responsive Design:** The design is responsive and works well across different screen sizes.

## Components

### 1. `Browse.jsx`
The main container for the browse page, responsible for rendering a list of job opportunities. It includes mock job data and utilizes the `SingleJob` component to display the job details.

- **Navbar:** Includes a reusable `Navbar` component for easy navigation.
- **Job Listings:** Uses a grid layout to render multiple job listings based on the mock data.
- **Search Result Count:** Displays the number of jobs in the search result at the top of the page.

### 2. `SingleJob.jsx`
Each job card in the grid is rendered using the `SingleJob` component, displaying relevant information such as:

- Company Name
- Location
- Job Title
- Job Description
- Available Positions
- Salary
- Job Type

- **Purpose**: Each individual job listing is represented using the `Singlejob` component.
- **Key Features**:
  - Displays job details like the company name, job title, location, and description.
  - Shows job-specific information like available positions, salary, and job type (e.g., full-time, part-time).
  - Includes action buttons, such as "Save for later" and "Details," allowing users to interact with the listings.
  - Uses badges to highlight job-specific tags like job type and salary range.
  - Includes a logo or avatar of the company for a professional look.

  
# User Profile Page

The **User Profile Page** is a crucial section of the job portal where users can view and manage their profile, including their personal information, skills, and applied jobs.

## Overview

- **User Details**: Displays essential information such as the user's name, email, and contact number.
- **Skills**: Shows the user's listed technical skills using badges.
- **Resume**: Includes a link to the user's uploaded resume.
- **Applied Jobs**: A table that shows a list of jobs the user has applied to, including the application date, role, company name, and current application status.

## Components

### 1. Profile Component (`Profile.jsx`)
- **Purpose**: This component displays the user profile details, including avatar, name, email, contact information, and skills. It also links to the resume and provides an overview of applied jobs.
- **Key Features**:
  - Avatar image for profile identification.
  - Editable contact information.
  - Badge-based display of user skills.
  - A resume section that links to an external file (Google Drive, etc.).
  - Integration with the `AppliedJobTable` component to list the jobs the user has applied for.

### 2. Applied Jobs Table Component (`AppliedJobTable.jsx`)
- **Purpose**: This component renders a table of jobs the user has applied for, including important details such as application date, job role, company, and application status.
- **Key Features**:
  - Table format with headers for date, job role, company, and status.
  - Uses badges to show the status of the job application (e.g., "Selected").
  - Displays a dynamic list of jobs that the user has applied to, ensuring the data is up-to-date.

### Key UI Elements
- **Navbar**: Provides navigation across the application.
- **Avatar and Contact Information**: Displays a professional image and personal details of the user.
- **Skills Section**: A badge-based system that allows users to showcase their skills in an organized manner.
- **Resume Link**: A clickable link for the user's resume, enhancing their job-seeking experience.
- **Applied Jobs Table**: A dynamic table showing the jobs the user has applied to, with the current status of their applications.

## Layout
- **Two main sections**:
  - **Profile Info**: Shows personal details and skills, including the avatar, name, contact information, skills, and resume link.
  - **Applied Jobs**: Displays job applications in a table format, where users can track the status of their applications.

# Job Description Page

## Overview

The `JobDescription` component is responsible for rendering detailed information about a particular job and allowing users to apply for the job. The job details are fetched from a backend API, and the user is notified of the application status in real-time.

## Key Features

- **Job Details Display**: Displays essential information such as job title, role, location, salary, experience required, and total applicants.
- **Apply for Job**: Allows the user to apply for the job by clicking a button, which dynamically updates to show whether the user has already applied.
- **Dynamic State Management**: Utilizes Redux for managing global state, and React hooks like `useState` and `useEffect` to manage and synchronize the local state with the backend.
- **Real-Time UI Updates**: Upon successfully applying for a job, the UI is updated in real-time to reflect the change in application status.

## Libraries and Dependencies

- **React**: For creating the UI components.
- **Redux**: For managing global state related to jobs and user data.
- **Axios**: For making HTTP requests to the backend API.
- **Sonner**: For displaying notifications (toasts) on actions like successful job applications or errors.
- **React Router**: For handling dynamic routing (extracting the job ID from the URL).
- **Tailwind CSS**: For styling the component and ensuring a consistent look.

## File Structure

```plaintext
src/
  └── components/
      └── JobDescription.js
```
# Update Profile Dialog

## Overview

The `UpdateProfileDialog` component is a user interface that allows users to update their profile details. It provides a dialog box where users can edit their full name, email, phone number, bio, skills, and upload their resume. The updated data is sent to the backend and reflected in the Redux store.

## Key Features

- **Editable Profile Fields**: Users can update their full name, email, phone number, bio, skills, and upload a resume.
- **File Upload**: The resume file can be uploaded in PDF format and is handled by `FormData` to send it to the backend.
- **Form State Management**: The component uses React's `useState` to manage the form's input fields and file upload. `useEffect` ensures that the initial values are pre-populated with the user's current data.
- **Loading State**: While the form submission is in progress, a spinner is shown on the submit button to indicate that the process is ongoing.
- **Real-Time State Update**: The Redux store is updated in real-time with the new profile data after a successful form submission.

## Structure and Functionality

- **Form Layout**:
  - The form contains the following fields:
    - Full Name
    - Email
    - Phone Number
    - Bio
    - Skills (comma-separated)
    - Resume (file upload)
  - The `Input` component is used for all text-based fields.
  
- **Submit Process**:
  - On form submission, a `POST` request is sent to update the profile using `axios`.
  - Form data, including the resume file, is submitted using `multipart/form-data`.

## Libraries and Dependencies

- **React**: For managing component state and rendering the UI.
- **Redux**: For global state management, updating the user profile information.
- **Axios**: For making HTTP requests to update the profile

# useGetAllJobs Hook

## Overview

The `useGetAllJobs` custom hook fetches a list of all jobs from the backend API and stores the result in the Redux state. This hook is intended to be used by components that need access to job data without directly implementing the logic for fetching and dispatching data.

## Key Features

- **API Request**: Makes an HTTP GET request to fetch all available jobs.
- **Redux Integration**: Dispatches the job data to the global Redux store, making it accessible across the app.
- **Error Handling**: Logs errors if the API request fails.
- **One-time Fetch**: Ensures that the data is fetched only once using the `useEffect` hook when the component mounts.
- **Reusability**: Abstracts fetching job data into a custom hook for use across multiple components.

## Usage Example

```javascript
import useGetAllJobs from '@/hooks/useGetAllJobs';

function JobComponent() {
  useGetAllJobs();

  return (
    <div>
      {/* Render jobs */}
    </div>
  );
}
```

# Persisting Redux Store with `redux-persist`

This guide explains how to persist the Redux store in your application using `redux-persist`. By persisting the store, you ensure that the Redux state (e.g., user data, job applications) is stored across page reloads, improving the user experience.

## Installation

First, install the `redux-persist` library:

```bash
npm install redux-persist

