import React, { useRef, useState } from 'react';
import Button from 'components/Button';
import AuthLayout from 'layouts/AuthLayout';
import { useHistory, useParams } from 'react-router-dom';
import { resetPassword } from 'services/auth';
import { useForm } from 'react-hook-form';
import FloatingInput from 'components/FloatingInput';
import { passwordChecker, passwordValidation } from 'services/validations';
import { toast } from 'react-toast';
import styles from './styles.module.scss';

const ResetPassword: React.FC = () => {
  const params = useParams<{ confirmationCode: string }>();
  const { confirmationCode } = params;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch('password', '');
  const history = useHistory();

  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (data: UserInfo) => {
    setIsSending(true);
    console.log('Password=>', data.password);
    try {
      const res = await resetPassword(confirmationCode, data.password ?? '');
      history.push('/auth/login');
      setIsSending(false);
      toast.success(res.data.message);
    } catch (error: any) {
      setIsSending(false);
      toast.error(error.response.data);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.wrapper}>
        <span className={styles.placeholder} aria-hidden="true">
          &#8203;
        </span>
        <div className={styles.container}>
          <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className={styles.description}>Set your new password</div>
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
                  validate: (value: string) =>
                    value === password.current || 'Password and Confirm password do not match',
                })}
                error={errors.confirmPassword}
              />
              <Button disabled={isSending} className={styles.button}>
                Reset
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
