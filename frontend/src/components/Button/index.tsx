import React, { ReactNode } from 'react';
import classNames from 'classnames';
import ReactLoading from 'react-loading';
import styles from './styles.module.scss';

type Props = {
  type?: 'submit' | 'button' | 'reset' | undefined;
  style?: 'yellow' | 'primary' | 'secondary' | undefined;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  type = 'submit',
  style = 'yellow',
  className = '',
  children,
  disabled = false,
  onClick = () => {},
}: Props) {
  return (
    <button
      // eslint-disable-next-line
      type={type}
      disabled={disabled}
      className={classNames(styles.button, { [styles.yellow]: style === 'yellow' }, className)}
      onClick={onClick}
    >
      {disabled ? <ReactLoading type="bars" width={28} height={28} /> : children}
    </button>
  );
}
