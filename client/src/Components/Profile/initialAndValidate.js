import * as yup from 'yup';

const validateProfile = yup.object().shape({
  firstName: yup
    .string()
    .required('Vui lòng nhập họ')
    .min(2, 'Họ phải ít nhất 2 ký tự'),
  lastName: yup
    .string()
    .required('Vui lòng nhập Tên')
    .min(2, 'Họ phải ít nhất 2 ký tự'),
  mobile: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .matches(/0{1}\d{9}/, 'Số điện thoại không hợp lệ'),
  story: yup
    .string()
    .required('Vui lòng nhập tiểu sử')
    .max(200, 'Tiểu sử quá dài'),
});

const initialValuesProfile = {
  firstName: '',
  lastName: '',
  mobile: '',
  story: '',
};

export { validateProfile, initialValuesProfile };
