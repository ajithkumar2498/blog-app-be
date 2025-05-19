import postModel from "../models/postModel.js";
import User from "../models/userModel.js";
import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

export const getAllBlogs = async (req, res) => {
  try {
    const posts = await postModel.find().populate("user", "name email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve blog posts",
      error: error.message,
    });
  }
};

export const getBlogsByAuthorAndCategory = async (req, res) => {
    const { author, category } = req.query;

  const query = {};

  if (author) {
    query.author = { $regex: author, $options: "i" };
  }

  if (category) {
    query.category = { $regex: category, $options: "i" };
  }
  try {
  
    const blogs = await postModel.find(query);
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const userId = req?.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Not Authenticated" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const newPost = new postModel({
      user: user._id,
      author: user.name,
      ...req.body,
    });

    const post = await newPost.save();
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params?.id;

    console.log("postID", postId);

    if (!postId) {
      return res.status(400).send({
        message: "Post ID is required",
      });
    }

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).send({
        message: "Post Not Found",
      });
    }

    await postModel.findByIdAndDelete(postId);

    return res.status(200).send({
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const userId = req?.user?.userId; // from your auth middleware
    const postId = req.params.id;
    const updateData = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Not Authenticated" });
    }

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the logged-in user is the author of the post
    if (post.user._id.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this post" });
    }

    updateData.updatedAt = Date.now();

    const updatedPost = await postModel.findByIdAndUpdate(postId, updateData, {
      new: true,
    });

    res.status(200).json({
      updatedPost,
      message: "Post updated Successfully",
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPostById = async (req, res)=>{
  try {
     const postId  = req?.params?.id
     
     const post = await postModel.findById(postId)

     if(!post){
      return res.status(404).send({
        message:"Post Not Found"
      })
     }

     res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const uploadAuth = (req, res) => {
  try {
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

  const authParams = imagekit.getAuthenticationParameters();
  res.json(authParams);
  } catch (error) {
    console.error("ImageKit auth error:", error);
    res.status(500).json({ message: "Failed to generate upload auth" });
  }
};
