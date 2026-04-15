import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
    <h1 className="text-5xl font-bold mb-2">404</h1>
    <p className="opacity-70 mb-6">The page you're looking for doesn't exist.</p>
    <Link to="/" className="btn btn-primary rounded-full">
      Back to Home
    </Link>
  </div>
);

export default NotFound;
