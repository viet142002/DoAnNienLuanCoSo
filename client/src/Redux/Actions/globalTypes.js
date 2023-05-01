export const GLOBALTYPES = {
  AUTH: 'AUTH',
  ALERT: 'ALERT',
};

export const EditData = (data, id, post) => {
  // duyệt qua từng post xem post nào dc cập nhật thì thay đổi
  const newData = data.map((item) => (item._id === id ? post : item));
  return newData;
};

export const DeleteData = (data, id) => {
  // Duyệt qua từng ptu bỏ ptu nao có id trung voi id đầu vào
  const newData = data.filter((item) => item._id !== id);
  return newData;
};
