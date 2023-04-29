import classNames from 'classnames/bind';
import style from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Button } from '@mui/material';
import { initialValuesLogin, loginValidate } from './validate';
import { login } from '../../Redux/Actions/authAction';

const cx = classNames.bind(style);

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFormSubmit = (userData) => dispatch(login(userData, navigate));

  const [typePassText, setTypePassText] = useState(false);

  return (
    <div className={cx('container')}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesLogin}
        validationSchema={loginValidate}
      >
        {({
          handleBlur,
          handleSubmit,
          handleChange,
          isSubmitting,
          touched,
          errors,
          values,
        }) => (
          <form onSubmit={handleSubmit} method="post">
            <div className={cx('inner-form')}>
              <div className={cx('design')}>
                <div className={cx('pill-1', 'rotate-45')}></div>
                <div className={cx('pill-2', 'rotate-45')}></div>
                <div className={cx('pill-3', 'rotate-45')}></div>
                <div className={cx('pill-4', 'rotate-45')}></div>
              </div>
              <div className={cx('login')}>
                <h3 className={cx('title')}>Đăng nhập</h3>
                <div className={cx('text-input')}>
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Địa chỉ email"
                  />
                  {touched.email && errors.email && (
                    <small className={cx('helper')}>{errors.email}</small>
                  )}
                </div>
                <div className={cx('text-input')}>
                  <input
                    type={typePassText ? 'text' : 'password'}
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    placeholder="Mật khẩu"
                  />
                  {values.password.length > 1 && (
                    <small
                      className={cx('show-pass')}
                      onClick={() => setTypePassText(!typePassText)}
                    >
                      {typePassText ? 'Ẩn' : 'Hiện'}
                    </small>
                  )}
                  {touched.password && errors.password && (
                    <small className={cx('helper')}>{errors.password}</small>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  sx={{ width: '70%', borderRadius: '20px', marginTop: '12px' }}
                  className={cx('btn-submit')}
                >
                  Đăng nhập
                </Button>

                <div className={cx('create-login')}>
                  <p>
                    Bạn chưa có tài khoản?
                    <Link className={cx('swap-page')} to="/register">
                      Đăng ký tại đây.
                    </Link>
                  </p>

                  <i className={cx('ri-arrow-right-fill')}></i>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
