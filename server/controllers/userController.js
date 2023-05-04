const Users = require('../models/userModel');
const Posts = require('../models/postModel');

const userController = {
  searchUser: async (req, res) => {
    console.log({ username: req.query.username });
    try {
      const users = await Users.find({
        userName: { $regex: req.query.username },
      })
        .limit(10)
        .select('fullName avatar');
      res.json({ users });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id)
        .select('-password')
        .populate('followers following', '-password');
      if (!user) return res.status(400).json({ msg: 'User does not exist.' });

      res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { avatar, firstName, lastName, story, mobile } = req.body;

      if ({}) {
      }

      await Users.findByIdAndUpdate(req.user._id, {
        userName: `${firstName}${lastName}`.toLowerCase().replace(/ /g, ''),
        avatar: avatar,
        firstName: firstName,
        lastName: lastName,
        story: story,
        mobile: mobile,
      });
      res.status(200).json({ msg: 'Cập nhật profile thành công!' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  follow: async (req, res) => {
    try {
      let user = await Users.find({
        _id: req.user._id,
        following: req.params.id,
      });
      if (user.length > 0) {
        return res.status(400).json({ msg: 'Bạn đã theo dỗi người này' });
      }

      await Users.findByIdAndUpdate(
        req.params.id,
        {
          $push: { followers: req.user.id },
        },
        { new: true }
      );

      await Users.findByIdAndUpdate(
        req.user.id,
        {
          $push: { following: req.params.id },
        },
        { new: true }
      );

      res.status(200).json({ msg: 'Theo dõi thành công' });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  unFollow: async (req, res) => {
    try {
      let user = await Users.find({
        _id: req.user._id,
        following: req.params.id,
      });
      if (user.length === 0) {
        return res.status(404).json({ msg: 'Bạn chưa theo dõi người này' });
      }
      await Users.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { followers: req.user._id },
        },
        { new: true }
      );
      await Users.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.params.id },
        },
        { new: true }
      );
      return res.status(200).json({ msg: 'Bỏ theo dõi thành công' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
