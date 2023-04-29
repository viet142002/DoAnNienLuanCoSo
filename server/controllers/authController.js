const bcrypt = require('bcrypt');
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');

const authController = {
  //REGISTER
  register: async (req, res) => {
    try {
      const { firstName, lastName, password, email } = req.body;

      const user_email = await Users.findOne({ email });

      if (user_email)
        return res.status(400).json({ msg: 'Email người dùng đã tồn tại.' });
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: 'Mật khẩu phải có ít nhất 6 ký tự.' });

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      let userName = `${firstName}${lastName}`;

      const newUser = new Users({
        userName: userName.toLowerCase().replace(/ /g, ''),
        firstName: firstName.replace(/ /g, ''),
        lastName: lastName.replace(/ /g, ''),
        email,
        password: passwordHash,
      });

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });
      res.cookie('refreshToken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, //30d
      });

      const saveUser = await newUser.save();

      res.status(201).json({
        msg: 'Register success!',
        access_token: access_token,
        user: {
          ...saveUser._doc,
          password: '',
        },
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email }).populate(
        'followers following',
        '-password'
      );

      if (!user)
        return res.status(400).json({ msg: 'Email người dùng không tồn tại.' });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Sai mật khẩu.' });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie('refreshToken', refresh_token, {
        httpOnly: true,
        secure: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, //30d
      });

      res.status(201).json({
        msg: 'Đăng nhập thành công!',
        access_token: access_token,
        user: {
          ...user._doc,
          password: '',
        },
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie('refreshToken', { path: '/api/refresh_token' });
      res.status(200).json({ msg: 'Đã đăng xuất tài khoản.' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      if (!rf_token) res.status(400).json({ msg: 'Vui lòng đăng nhập trước.' });
      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_KEY,
        async (error, result) => {
          if (error)
            return res.status(400).json({ msg: 'Vui lòng đăng nhập trước.' });

          const user = await Users.findById(result.id)
            .select('-password')
            .populate('followers following', '-password');
          if (!user)
            return res.status(400).json({ msg: 'Tài khoản không tồn tại.' });

          const access_token = createAccessToken({ id: result.id });

          res.status(200).json({ access_token, user });
        }
      );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '1d' });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: '30d' });
};

module.exports = authController;
