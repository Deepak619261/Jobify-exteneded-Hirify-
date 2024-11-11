import React from 'react';

export default function About() {
    return (
        <div className="max-w-screen-xl mx-auto p-6 text-gray-800">
            <h1 className="text-3xl font-semibold text-center text-orange-700 mb-4">About This Project</h1>
            <p className="text-lg mb-6 text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
                Welcome to the Web Hiring Platform Application! This project is designed to provide a streamlined solution for managing the hiring process, offering an intuitive and user-friendly experience for administrators who need to manage job postings, track candidates, and assign job-specific assessments.
            </p>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-orange-700 mb-4">Project Objective</h2>
                <p className="text-gray-600 leading-relaxed">
                    The primary objective of this application is to simplify and enhance the recruitment workflow. By using this platform, administrators can efficiently:
                </p>
                <ul className="list-disc list-inside ml-6 mt-4 text-gray-700 space-y-2">
                    <li>Post and manage job openings.</li>
                    <li>Track applicants and view detailed candidate profiles.</li>
                    <li>Create tailored assessments for each job position to ensure the best candidate fit.</li>
                </ul>
                <p className="mt-4 text-gray-600 leading-relaxed">
                    This application aims to be a valuable tool for hiring teams, helping them stay organized and making the hiring process more transparent and manageable.
                </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-orange-700 mb-4">Key Features</h2>
                <ul className="list-disc list-inside ml-6 text-gray-700 space-y-4">
                    <li>
                        <strong>Dashboard for Job Postings:</strong> Allows admins to view, add, edit, and delete job postings. Each job entry includes job title, description, and the number of candidates applied.
                    </li>
                    <li>
                        <strong>Candidate Tracking and Details:</strong> Provides access to each candidate's name, resume, application date, and current status. The admin can view a detailed profile page for each candidate.
                    </li>
                    <li>
                        <strong>Job-Specific Assessments:</strong> Enables unique assessments for each job, with a set of multiple-choice questions that can be customized as per the job's requirements.
                    </li>
                </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-orange-700 mb-4">About the Developer</h2>
                <p className="text-gray-600 leading-relaxed">
                    This application was developed by <strong>Deepak</strong>, a passionate developer from <strong>NIT Jalandhar (NITJ)</strong>. With a strong foundation in React and modern web development principles, Deepak aimed to create a platform that is not only functional but also easy to use and visually appealing. This project demonstrates a commitment to clean code, modular architecture, and efficient state management, reflecting the best practices in React development.
                </p>
            </div>

            <div className="text-center mt-8">
                <p className="text-gray-600 italic">Thank you for exploring the Web Hiring Platform Application! We hope this tool enhances the hiring experience and provides value to administrators and hiring teams alike.</p>
            </div>
        </div>
    );
}
