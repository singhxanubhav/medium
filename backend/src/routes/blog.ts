import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { createBlogInput, updateBlogInput } from "@anubhavxsingh/common-blog";

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
      return res.status(403).json({ message: "You are not logged in" });
    }

    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!user || !user.id) {
      return res.status(403).json({ message: "You are not logged in" });
    }

    req.userId = user.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "You are not logged in" });
  }
};

// Create a new blog post
// @ts-ignore
blogRouter.post("/", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { success } = createBlogInput.safeParse(req.body);
    if (!success) {
      return res.status(411).json({ message: "Inputs not correct" });
    }

    const post = await prisma.blog.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        authorId: Number(req.userId),
      },
    });

    return res.json({ id: post.id });
  } catch (error) {
    return res.status(500).json({ message: "Error creating post" });
  }
});

// Update a blog post
// @ts-ignore
blogRouter.put("/", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { success } = updateBlogInput.safeParse(req.body);
    if (!success) {
      return res.status(411).json({ message: "Inputs not correct" });
    }

    const updatedPost = await prisma.blog.update({
      where: { id: req.body.id },
      data: {
        title: req.body.title,
        content: req.body.content,
      },
    });

    return res.json({ id: updatedPost.id });
  } catch (error) {
    return res.status(500).json({ message: "Error updating post" });
  }
});

// Get all blog posts
// @ts-ignore
blogRouter.get("/bulk", async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: { name: true, username: true },
        },
      },
    });

    return res.json({ blogs });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching blogs" });
  }
});

// Get a blog post by ID
// @ts-ignore
blogRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const blog = await prisma.blog.findFirst({
      where: { id: Number(id) },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: {
          select: { name: true, username: true },
        },
      },
    });

    if (!blog) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.json({ blog });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving post" });
  }
});

export default blogRouter;
