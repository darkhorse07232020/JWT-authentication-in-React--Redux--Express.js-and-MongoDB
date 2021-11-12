import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
// import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login-typed';

import logo from 'assets/svgs/logo.svg';
import googleSVG from 'assets/svgs/google.svg';
import facebookSVG from 'assets/svgs/facebook.svg';
import { requestVerify } from 'services/auth';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'components/Modal';
import { selectLoginError } from 'store/error-handling/selectors';
import { selectUserIsLogin } from 'store/auth/selectors';
import { toast } from 'react-toast';
import { loginGoogle } from 'store/auth/actions';
import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode;
};

const AuthWrapper: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const loginError = useSelector(selectLoginError);
  const isLogin = useSelector(selectUserIsLogin);
  const [isVerified, setVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSending, setSending] = useState(false);

  const history = useHistory();

  const responseGoogle = (googleData: any) => {
    console.log(googleData);
    if (googleData.profileObj) {
      setEmail(googleData.profileObj.email);
      dispatch(
        loginGoogle({
          email: googleData.profileObj.email,
          firstName: googleData.profileObj.givenName,
          lastName: googleData.profileObj.familyName,
        })
      );
    }
  };

  // const responseFacebook = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
  //   console.log(response);
  // };

  const requestVerification = async () => {
    setSending(true);
    try {
      const res = await requestVerify(email);
      setSending(false);
      setVerified(false);
      toast.success(res.data.message);
    } catch (error: any) {
      setVerified(false);
      setSending(false);
      toast.error(error.response.data);
    }
  };

  // useEffect(() => {
  //   if (loginError) {
  //     if (loginError.code === 401) {
  //       setVerified(true);
  //       setVerificationMessage(loginError.message);
  //     } else toast.error(loginError.message);
  //   }
  // }, [loginError]);

  // useEffect(() => {
  //   if (isLogin) history.push('/');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLogin]);

  return (
    <div className={styles.authWrapper}>
      <img src={logo} alt="Logo" width={280} height={280} className={styles.logo} />
      <div className={styles.header}>
        <h2 className="text-3xl font-semibold">Nice to see you!</h2>
        <h3 className="text-base font-light leading-9">Create an account or log in.</h3>
      </div>
      <div className={styles.tabWrapper}>
        <NavLink to="/auth/login" activeClassName={styles.active} className={styles.link}>
          Log in
        </NavLink>
        <NavLink to="/auth/register" activeClassName={styles.active} className={styles.link}>
          Create an account
        </NavLink>
      </div>
      <div className="w-full pt-3 pb-5">{children}</div>
      <div className={styles.socialHr}>Or sign in with</div>
      <div className={styles.socialGroup}>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ''}
          render={renderProps => (
            <img
              src={googleSVG}
              alt="Google"
              width={48}
              height={48}
              className={styles.social}
              onClick={renderProps.onClick}
              aria-hidden
            />
          )}
          buttonText="Log in with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        />
        {/* <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID ?? ''}
          callback={responseFacebook}
          render={(renderProps: any) => ( */}
        <img
          src={facebookSVG}
          alt="Facebook"
          width={48}
          height={48}
          className={styles.social}
          // onClick={renderProps.onClick}
          aria-hidden
        />
        {/* )} */}
        {/* /> */}
      </div>
      <Modal
        isOpen={isVerified}
        closeModal={() => {
          setVerified(false);
        }}
        isPending={isSending}
        content={verificationMessage}
        buttonLabel="Send Verification Email"
        buttonClick={requestVerification}
      />
    </div>
  );
};

export default AuthWrapper;
