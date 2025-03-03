import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const blogRouter = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

interface AuthRequest extends Request {
  userId?: string;
}

// Middleware for authentication
const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!payload || typeof payload !== "object" || !payload.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.userId = payload.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

// Create a new blog post
// @ts-ignore
blogRouter.post("/", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: req.userId!,
      },
    });

    return res.json({ id: post.id });
  } catch (error) {
    return res.status(500).json({ error: "Error creating post" });
  }
});

// Update a blog post
// @ts-ignore
blogRouter.put("/", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id, title, content } = req.body;

    if (!id || !title || !content) {
      return res
        .status(400)
        .json({ error: "ID, title, and content are required" });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id,
        authorId: req.userId!,
      },
      data: {
        title,
        content,
      },
    });

    return res.json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error updating post" });
  }
});

// Get a blog post by ID
// @ts-ignore
blogRouter.get("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: "Error retrieving post" });
  }
});

export default blogRouter;
