const Posts = require('../models/postModel');

const postController = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body;
      if (content.length === 0)
        return res.status(400).json({ msg: 'Vui lòng thêm nội dung' });

      const newPost = new Posts({
        content: content.trim(),
        images,
        user: req.user._id,
      });

      await newPost.save();

      res.status(200).json({
        msg: 'Đăng bài thành công',
        newPost: await Posts.findById(newPost._id).populate('user'),
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getPosts: async (req, res) => {
    try {
      const posts = await Posts.find()
        .sort('-createdAt')
        .populate('user likes', '_id avatar fullName followers')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '_id avatar fullName followers',
          },
        });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updatePost: async (req, res) => {
    try {
      const { content, images } = req.body;

      const post = await Posts.findByIdAndUpdate(req.params.id, {
        content,
        images,
      }).populate('user');
      res.json({
        msg: 'Updated Post!',
        newPost: {
          ...post._doc,
          content,
          images,
        },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deletePost: async (req, res) => {
    try {
      await Posts.findByIdAndDelete(req.params.id);
      res.status(200).json({ id: req.params.id, msg: 'Delete success' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUserPosts: async (req, res) => {
    try {
      const posts = await Posts.find({ user: req.params.id })
        .sort('-createdAt')
        .populate('user likes', '_id avatar fullName followers')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '_id avatar fullName followers',
          },
        });
      return res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Posts.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (post.length > 0)
        return res.status(400).json({ msg: 'Bạn đã like bài post này' });

      const like = await Posts.findByIdAndUpdate(
        req.params.id,
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like)
        return res.status(400).json({ msg: 'Bài post này không tồn tại' });

      res.status(200).json({ msg: 'Liked Post!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unLike: async (req, res) => {
    try {
      const post = await Posts.findOne({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (post.length === 0)
        return res.status(400).json({ msg: 'Bạn chưa like bài post này' });
      const newPost = await Posts.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );
      if (!newPost)
        return res.status(400).json({ msg: 'Bài post này không tồn tại' });
      res.status(200).json({ msg: 'UnLike Post!' });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = postController;
