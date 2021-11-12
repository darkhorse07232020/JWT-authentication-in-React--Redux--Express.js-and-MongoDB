import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './styles.module.scss';

type Props = {
  label?: string;
  name: string;
  type: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  register?: any;
  error?: FieldError;
};

const FloatingInput = forwardRef(
  (
    {
      className = '',
      name,
      type,
      required = false,
      placeholder = ' ',
      label,
      autoComplete = '',
      register = {},
      error,
    }: Props,
    ref
  ) => {
    return (
      <div className={className}>
        <div className={styles.wrapper}>
          <input
            ref={ref}
            tabIndex={0}
            id={name}
            name={name}
            type={type}
            autoComplete={autoComplete}
            required={required}
            placeholder={placeholder}
            className={styles.input}
            {...register}
          />
          {label ? (
            <label htmlFor={name} className={styles.label}>
              {label}
            </label>
          ) : null}
        </div>
        {error ? (
          <div className="flex-1">
            <p className="mt-1 text-xs text-red-500">{error.message}</p>
          </div>
        ) : null}
      </div>
    );
  }
);

export default FloatingInput;
