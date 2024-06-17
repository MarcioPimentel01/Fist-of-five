// controllers/postController.js
// const { Post, User } = require("../models");
// const { formatDateTo12Hour } = require("../utils");

// exports.createPost = async (req, res) => {
//   const { userId, thoughts } = req.body; // Assuming userId is provided in the request body

//   if (!userId || !thoughts) {
//     return res.status(400).json({
//       status: "error",
//       message: "userId and thoughts are required",
//     });
//   }

//   try {
//     const post = await Post.create({ userId, thoughts }); // Assign userId to the userId field
//     res.status(201).json({
//       status: "success",
//       message: "Post added successfully",
//       data: {
//         id: post.id,
//         thoughts: post.thoughts,
//         createdAt: formatDateTo12Hour(post.createdAt),
//         userId: post.userId // Include userId in the response
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };


// // Get all posts with associated user information
// exports.getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ["username"], // Include only the username from the user table
//         },
//       ],
//     });

//     const formattedPosts = posts.map(post => ({
//       id: post.id,
//       thoughts: post.thoughts,
//       createdAt: formatDateTo12Hour(post.createdAt),
//       updatedAt: formatDateTo12Hour(post.updatedAt),
//       username: post.User ? post.User.username : null // Check if User is not null before accessing username
//     }));

//     res.status(200).json({ status: "success", data: formattedPosts });
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     res.status(500).json({ status: "error", message: "Internal server error" });
//   }
// };

// exports.deletePost = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const post = await Post.findByPk(id);
//     if (post) {
//       await post.destroy();
//       res.status(200).json({
//         status: "success",
//         message: "Post deleted successfully",
//       });
//     } else {
//       res.status(404).json({
//         status: "error",
//         message: "Post not found",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };

const { Post, User } = require('../models');

// Create a new post
exports.createPost = async (req, res) => {
    const { thoughts, userId } = req.body;

    if (!thoughts || !userId) {
        return res.status(400).json({ status: 'error', message: 'Thoughts and userId are required' });
    }

    try {
        const post = await Post.create({ thoughts, userId });
        res.status(201).json({ status: 'success', data: post });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ status: 'error', message: 'Failed to create post' });
    }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['username'], // Include only necessary user attributes
            },
            order: [['createdAt', 'DESC']],
        });

        const response = posts.map(post => ({
            id: post.id,
            thoughts: post.thoughts,
            createdAt: post.createdAt,
            username: post.User.username,
        }));

        res.json({ status: 'success', data: response });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch posts' });
    }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({ status: 'error', message: 'Post not found' });
        }

        await post.destroy();
        res.json({ status: 'success', message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ status: 'error', message: 'Failed to delete post' });
    }
};
