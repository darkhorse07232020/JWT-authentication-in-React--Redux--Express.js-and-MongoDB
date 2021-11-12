import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toast';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Button';
import FloatingInput from 'components/FloatingInput';
import {
  nameValidation,
  surnameValidation,
  passwordValidation,
  emailChecker,
  emailValidation,
  passwordChecker,
} from 'services/validations';

import Checkbox from 'components/Checkbox';
import { selectAuthMessage, selectAuthStatus } from 'store/auth/selectors';
import { selectRegisterError } from 'store/error-handling/selectors';
import { registerUser } from 'store/auth';

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const isRegistering = useSelector(selectAuthStatus) === 1;
  const registerError = useSelector(selectRegisterError);
  const message = useSelector(selectAuthMessage);

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (data: UserInfo) => {
    delete data.confirmPassword;
    delete data.tc;
    const body = { ...data, provider: 'email', role: 1 };
    dispatch(registerUser(body));
  };

  useEffect(() => {
    if (registerError) toast.error(registerError.message);
  }, [registerError]);

  useEffect(() => {
    if (message) toast.warn(message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <FloatingInput
          name="firstName"
          type="text"
          label="First Name"
          autoComplete="given-name"
          required
          register={register('firstName', {
            ...nameValidation,
            validate: (value: string) => {
              if (!value.trim()) {
                return 'Please enter your first name';
              }
              return true;
            },
          })}
          error={errors.firstName}
        />
        <FloatingInput
          name="lastName"
          type="text"
          label="Last Name"
          autoComplete="family-name"
          required
          register={register('lastName', {
            ...surnameValidation,
            validate: (value: string) => {
              if (!value.trim()) {
                return 'Please enter your Last name';
              }
              return true;
            },
          })}
          error={errors.lastName}
        />
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
            ...passwordValidation,
            required: 'Please select your password',
            validate: (value: string) =>
              passwordChecker(value) || 'Password must contain Uppercase, Lowercase, Number, Symbol',
          })}
          error={errors.password}
        />
        <FloatingInput
          name="confirmPassword"
          type="password"
          label="Confirm password"
          autoComplete=""
          register={register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value: string) => value === password.current || 'Password and Confirm password do not match',
          })}
          error={errors.confirmPassword}
        />
      </div>

      <Checkbox
        label="By registering you agree to the general terms and conditions of Mycomp IT-Services GmbH."
        name="tc"
        register={register('tc', { required: true })}
        className="mt-3"
      />

      <Button disabled={isRegistering} className="w-1/2 mx-auto mt-8">
        Create
      </Button>
    </form>
  );
};

export default Register;
