import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toast';

import Button from 'components/Button';
import FloatingInput from 'components/FloatingInput';
import { emailChecker, emailValidation } from 'services/validations';

import Checkbox from 'components/Checkbox';
import { loginUser } from 'store/auth';
import { selectAuthStatus, selectUserIsLogin } from 'store/auth/selectors';
import { selectLoginError } from 'store/error-handling/selectors';
import Modal from 'components/Modal';
import { requestVerify } from 'services/auth';

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const isLogging = useSelector(selectAuthStatus) === 1;
  const loginError = useSelector(selectLoginError);
  const isLogin = useSelector(selectUserIsLogin);
  const [isVerified, setVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSending, setSending] = useState(false);

  const history = useHistory();

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (data: UserInfo) => {
    setEmail(data.email);
    dispatch(loginUser(data));
  };

  const requestVerification = async () => {
    setSending(true);
    try {
      const res = await requestVerify(email);
      setVerified(false);
      setSending(false);
      toast.success(res.data.message);
    } catch (error: any) {
      setVerified(false);
      setSending(false);
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    if (loginError) {
      console.log(loginError);
      if (loginError.code === 401) {
        setVerified(true);
        setVerificationMessage(loginError.message);
      } else toast.error(loginError.message);
    }
  }, [loginError]);

  useEffect(() => {
    if (isLogin) history.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FloatingInput
            name="email"
            type="email"
            label="E-mail"
            autoComplete="email"
            required
            register={register('email', {
              ...emailValidation,
              validate: (value: string) => {
                if (!value.trim()) {
                  return 'Email Address is required';
                }
                return emailChecker(value) || 'Please enter valid email address';
              },
            })}
            error={errors.email}
          />
          <FloatingInput
            name="password"
            type="password"
            label="Password"
            autoComplete="password"
            required
            register={register('password', {
              required: 'Please select your password',
              validate: (value: string) => {
                if (!value.trim()) {
                  return 'Please enter your password';
                }
                return true;
              },
            })}
            error={errors.password}
          />
        </div>
        <div className="flex flex-nowrap items-center justify-between mt-3">
          <Checkbox label="Remember me" name="rememberMe" register={register('rememberMe')} />

          <Link to="/reset-password" className="text-secondary underline">
            Forgot Password
          </Link>
        </div>
        <Button disabled={isLogging} className="w-1/2 mx-auto mt-8">
          Sign in
        </Button>
      </form>
      <Modal
        isOpen={isVerified}
        isPending={isSending}
        closeModal={() => {
          setVerified(false);
        }}
        content={verificationMessage}
        buttonLabel="Send Verification Email"
        buttonClick={requestVerification}
      />
    </>
  );
};

export default Login;
