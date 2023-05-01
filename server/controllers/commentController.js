const Comments = require('../models/commentModel');
const Posts = require('../models/postModel');

const commentController = {
  createComment: async (req, res) => {
    try {
      const { content, tag, reply, postId, postUserId } = req.body;

      if (content.length === 0)
        return res.status(400).json({ msg: 'Vui lòng thêm nội dung' });
      if (reply) {
        const isExist = await Comments.findById(reply);
        if (!isExist)
          return res.status(200).json({ msg: 'Bình luận này không tồn tại' });
      }
      const newComment = new Comments({
        user: req.user._id,
        content,
        postId,
        postUserId,
        tag,
        reply,
      });

      await newComment.save();

      await Posts.findByIdAndUpdate(
        postId,
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );

      res.status(200).json({ newComment });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  likeComment: async (req, res) => {
    try {
      const checkExist = await Comments.findById(req.params.id);

      if (!checkExist)
        return res.status(400).json({ msg: 'Bình luận không tồn tại' });

      await Comments.findByIdAndUpdate(
        req.params.id,
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      res.status(200).json({ msg: 'Đã like comment' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  unLikeComment: async (req, res) => {
    try {
      const checkExist = await Comments.findById(req.params.id);

      if (!checkExist)
        return res.status(400).json({ msg: 'Bình luận không tồn tại' });

      await Comments.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      res.status(200).json({ msg: 'Đã like comment' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  editComment: async (req, res) => {
    try {
      const { content } = req.body;
      await Comments.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        {
          content,
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteComment: async (req, res) => {
    try {
      await Comments.findByIdAndDelete(req.params.id);
      await Posts.findOneAndUpdate(
        { comments: req.params.id },
        {
          $pull: { comments: req.params.id },
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = commentController;
