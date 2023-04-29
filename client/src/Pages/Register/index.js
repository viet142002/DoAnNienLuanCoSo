import classNames from 'classnames/bind';
import style from '../Login/Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Button } from '@mui/material';

import { register } from '../../Redux/Actions/authAction';
import { initialValuesRegister, registerValidate } from './validateAndInitial';

const cx = classNames.bind(style);

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFormSubmit = (userData) => dispatch(register(userData, navigate));

  const [typePassText, setTypePassText] = useState(false);
  const [typeCfPassText, setTypeCfPassText] = useState(false);

  return (
    <div className={cx('container')}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesRegister}
        validationSchema={registerValidate}
      >
        {({
          handleBlur,
          handleSubmit,
          handleChange,
          touched,
          errors,
          values,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} action="" method="post">
            <div className={cx('inner-form')}>
              <div className={cx('design')}>
                <div className={cx('pill-1', 'rotate-45')}></div>
                <div className={cx('pill-2', 'rotate-45')}></div>
                <div className={cx('pill-3', 'rotate-45')}></div>
                <div className={cx('pill-4', 'rotate-45')}></div>
              </div>
              <div className={cx('login')}>
                <h3 className={cx('title')}>Đăng ký</h3>
                <div className={cx('text-input')}>
                  <div className={cx('firstName', 'name')}>
                    <input
                      type="text"
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      placeholder="Họ"
                    />
                    {touched.firstName && errors.firstName && (
                      <small className={cx('helper')}>{errors.firstName}</small>
                    )}
                  </div>
                  <div className={cx('lastName', 'name')}>
                    <input
                      type="text"
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      placeholder="Tên"
                    />
                    {touched.lastName && errors.lastName && (
                      <small className={cx('helper')}>{errors.lastName}</small>
                    )}
                  </div>
                </div>
                <div className={cx('text-input')}>
                  <input
                    type="text"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    placeholder="Địa chị email"
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
                    onBlur={handleBlur}
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
                <div className={cx('text-input')}>
                  <input
                    type={typeCfPassText ? 'text' : 'password'}
                    name="confirmPassword"
                    className={cx('confirm-password')}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    placeholder="Nhập lại mật khẩu"
                  />
                  {values.confirmPassword.length > 1 && (
                    <small
                      className={cx('show-pass')}
                      onClick={() => setTypeCfPassText(!typeCfPassText)}
                    >
                      {typeCfPassText ? 'Ẩn' : 'Hiện'}
                    </small>
                  )}
                  {touched.confirmPassword && errors.confirmPassword && (
                    <small className={cx('helper')}>
                      {errors.confirmPassword}
                    </small>
                  )}
                </div>
                <Button
                  type="submit"
                  className={cx('btn-submit')}
                  disabled={isSubmitting}
                  variant="contained"
                  sx={{ width: '70%', borderRadius: '20px', marginTop: '12px' }}
                >
                  Đăng ký
                </Button>
                <div className={cx('create')}>
                  <p>
                    Bạn đã có tài khoản?
                    <Link to="/" className={cx('swap-page')}>
                      Đăng nhập tại đây.
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
