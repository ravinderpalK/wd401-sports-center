import { Link } from "react-router-dom";
import SigninForm from "./SigninForm";
import { useTranslation } from "react-i18next";


const Signin: React.FC = () => {
  const {t} = useTranslation();
  
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50 text-xs lg:text-base">
      <div className="max-w-lg w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-xl lg:text-3xl font-bold text-center text-gray-800 mb-8">{t('signin')}</h1>
        <SigninForm />
      </div>
      <div>
        <div className="mt-4 lg:text-base">
          New to Sports-center?
          <Link to="/signup" className="px-2">{t('signup')}</Link>
        </div>
      </div>
    </div>
  )
}

export default Signin;