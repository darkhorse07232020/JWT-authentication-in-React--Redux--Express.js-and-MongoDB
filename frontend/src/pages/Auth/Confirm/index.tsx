import React, { useEffect, useState } from 'react';
import Button from 'components/Button';
import AuthLayout from 'layouts/AuthLayout';
import { Link, useParams } from 'react-router-dom';
import { verifyUser } from 'services/auth';

const ConfirmPage: React.FC = () => {
  const params = useParams<{ confirmationCode: string }>();
  const { confirmationCode } = params;

  const [isVerified, setIsVerified] = useState(0);

  useEffect(() => {
    verifyUser(confirmationCode)
      .then(() => setIsVerified(2))
      .catch(() => setIsVerified(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isVerified === 0) return null;

  return (
    <AuthLayout>
      <div className="w-screen h-screen">
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block w-full align-middle justify-center">
          <div className="text-3xl mb-10 text-center">{isVerified === 2 ? 'Account confirmed!' : 'Token expired'}</div>
          <Link to="/auth/login">
            <Button className="mx-auto">Please Login</Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ConfirmPage;
