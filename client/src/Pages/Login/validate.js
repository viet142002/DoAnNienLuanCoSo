import * as yup from 'yup';

const loginValidate = yup.object().shape({
  email: yup
    .string()
    .email('Địa chỉ email không hợp lệ')
    .required('Vui lòng nhập tên đăng nhập'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

const initialValuesLogin = {
  email: '',
  password: '',
};

export { loginValidate, initialValuesLogin };
