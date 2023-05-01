import * as yup from 'yup';

const validateProfile = yup.object().shape({
  firstName: yup.string().min(2, 'Họ phải ít nhất 2 ký tự'),
  lastName: yup.string().min(2, 'Họ phải ít nhất 2 ký tự'),
  mobile: yup.string().matches(/0{1}\d{9}/, 'Số điện thoại không hợp lệ'),
  story: yup.string().max(200, 'Tiểu sử quá dài'),
});

const initialValuesProfile = {
  firstName: '',
  lastName: '',
  mobile: '',
  story: '',
};

export { validateProfile, initialValuesProfile };
