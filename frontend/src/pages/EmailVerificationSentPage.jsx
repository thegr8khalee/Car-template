import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

const EmailVerificationSentPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h1>
        
        <p className="text-gray-600 mb-8">
          We've sent a confirmation link to your email address. Please click the link to verify your account and sign in.
        </p>
        
        <div className="space-y-4">
          <Link 
            to="/profile" 
            className="btn btn-primary w-full rounded-full py-3 flex items-center justify-center"
          >
            Go to Login
          </Link>
          
          <Link 
            to="/" 
            className="flex items-center justify-center text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationSentPage;
