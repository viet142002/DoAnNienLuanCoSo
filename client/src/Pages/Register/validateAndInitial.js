import * as yup from 'yup';

const registerValidate = yup.object().shape({
  firstName: yup.string().required('Vui lòng nhập họ'),
  lastName: yup.string().required('Vui lòng nhập tên'),
  email: yup
    .string()
    .required('Vui lòng nhập tên đăng nhập')
    .email('Địa chỉ email khong hợp lệ'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự.'),
  confirmPassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu không chính xác.'),
});

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export { initialValuesRegister, registerValidate };
