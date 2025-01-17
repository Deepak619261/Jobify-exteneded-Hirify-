# Job Hiring Platform Application

## Objective
This is a React-based web application designed for managing job postings, tracking candidates, and creating job-specific assessments. It streamlines the hiring process by allowing an admin to post jobs, review candidate details, and assign tailored assessments for each open position.

## Live Demo
The application is deployed and can be accessed [here](https://hirify.vercel.app/).

## Features & Requirements

### 1. Dashboard for Managing Job Postings
- A page where the admin can monitor and edit job postings.
- Each job listing includes:
  - **Job title**
  - **Job description**
  - **Number of candidates applied**
- Admin actions:
  - **Edit**, **add**, and **delete** job postings.

### 2. Candidate Tracking & Details Page
- Allows the admin to click on a job posting to view a list of candidates who have applied.
- For each candidate, the following details are displayed:
  - **Candidate name**
  - **Resume link** or document (with upload/download functionality)
  - **Application date**
  - **Status** (e.g., "Under Review", "Interview Scheduled", etc.)
- Clicking on a candidate's name opens a detailed page with:
  - Candidate’s profile information (name, email, contact details, skills, experience)
  - **Resume preview** (or download link)
  - **Status update option**

### 3. Job-Specific Test/Assessment Creation
- The platform allows the admin to create unique assessments for each job.
- On a dedicated page, the admin can:
  - Select a job from a dropdown list.
  - Create multiple-choice questions for that job.
  - Add or edit questions and answers.
- Each job has its own distinct assessment; no two jobs share the same test.

### 4. User Interface & User Experience
- The application is designed to be **intuitive** and **responsive**, supporting both desktop and mobile devices.
- Clean and modular code is maintained, adhering to **React best practices**.
- **State management** (using Redux or React Context API) is used for efficient data handling and performance.

### 5. Additional Requirements
- **Routing**: Implemented using React Router to navigate between sections (job postings, candidates, assessments).
- **UI Library**: Uses Material-UI, Ant Design, or a custom component library for a consistent and user-friendly interface.
- **Data Persistence**: Optional; local storage or mock APIs may be used to simulate data. A basic backend is optional.

## Setup & Running Instructions

### Prerequisites
- Ensure that **Node.js** and **npm** are installed on your machine.
- **Git** should be installed for version control.

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Deepak619261/hirify-.git
