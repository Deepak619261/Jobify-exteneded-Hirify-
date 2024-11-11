import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const heroBackground = '/pic1.jpg';
const secondBackground = '/pic2.jpg';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard'); // Redirect to dashboard if logged in
    } else {
      navigate('/login'); // Redirect to login if not logged in
    }
  };

  return (
    <div className="text-white font-sans">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 px-6 md:px-12 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Bringing You the Future of Hiring
          </h1>
          <p className="text-lg md:text-xl mb-6">
            At Hirify, we bridge the gap between talent and opportunity, offering an efficient platform for recruiters and candidates to connect seamlessly.
          </p>
          {/* Use onClick to handle conditional navigation */}
          <button
            onClick={handleGetStarted}
            className="bg-green-500 hover:bg-green-600 font-semibold py-3 px-8 rounded-full text-lg transition duration-300"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* About Section */}
      <section
        className="relative flex items-center justify-center text-center py-20 md:py-28"
        style={{
          backgroundImage: `url(${secondBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 px-6 md:px-12 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Do</h2>
          <p className="text-lg md:text-xl mb-8">
            Hirify streamlines the recruitment process by empowering employers to find top talent efficiently and helping candidates showcase their potential.
          </p>
          <p className="text-lg md:text-xl">
            Our platform supports smooth job posting, candidate management, and real-time assessments, allowing both recruiters and candidates to focus on what matters most.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-28 bg-gray-900 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-green-400">
          Our Mission
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10">
          To revolutionize hiring by creating a powerful, intuitive, and inclusive platform where talent meets opportunity. We believe in a future where job searching and recruiting are seamless, efficient, and empowering.
        </p>
        <Link to="/login">
          <button className="bg-green-500 hover:bg-green-600 font-semibold py-3 px-8 rounded-full text-lg transition duration-300">
            Join Us
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
