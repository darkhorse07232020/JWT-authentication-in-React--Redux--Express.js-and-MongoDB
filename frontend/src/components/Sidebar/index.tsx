import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'components/Button';
import { toast } from 'react-toast';
import styles from './style.module.scss';

const Sidebar = () => {
  const logOutUser = () => {
    try {
      // firebase.auth().signOut();
    } catch (error) {
      // toast.error(error.message);
    }
  };

  return (
    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.link} activeClassName={styles.selected}>
          Dashboard
        </NavLink>
      </nav>
      <Button className="absolute bottom-5 w-56" onClick={logOutUser}>
        Log out
      </Button>
    </div>
  );
};

export default Sidebar;
