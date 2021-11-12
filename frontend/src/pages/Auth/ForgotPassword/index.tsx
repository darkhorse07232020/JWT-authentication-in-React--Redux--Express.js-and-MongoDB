import React, { useState } from 'react';
import Button from 'components/Button';
import AuthLayout from 'layouts/AuthLayout';
import { useForm } from 'react-hook-form';
import FloatingInput from 'components/FloatingInput';
import { emailChecker, emailValidation } from 'services/validations';
import { toast } from 'react-toast';
import { requestReset } from 'services/auth';
import styles from './styles.module.scss';

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (data: UserInfo) => {
    setIsSending(true);
    try {
      const res = await requestReset(data);
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.description}>Please enter your email</div>
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
              <Button disabled={isSending} className={styles.button}>
                Send Link
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
