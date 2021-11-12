import React from 'react';

import bgSVG from 'assets/svgs/main_bg.svg';
import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<Props> = ({ children }) => (
  <div className={styles.wrapper}>
    <div className={styles.backgroundWrapper}>
      <div className={styles.backdrop} />
      <img src={bgSVG} alt="Background" loading="lazy" width={820} height={645} className={styles.background} />
    </div>
    <div className={styles.container}>{children}</div>
  </div>
);

export default AuthLayout;
