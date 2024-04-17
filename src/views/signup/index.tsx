
import React from 'react';
import SignupForm from './SignupForm';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Signup: React.FC = () => {
  const {t} = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-xs lg:text-base">
      <div className="max-w-lg w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-xl lg:text-3xl font-bold text-center text-gray-800 mb-8">{t('signup')}</h1>
        <SignupForm />
      </div>
      <div>
        <div className="mt-4 lg:text-base">
          Already have an account?
          <Link to="/signin" className="px-2">{t('signin')}</Link>
        </div>
      </div>
    </div>
  );
}
export default Signup;