import express from "express";
import dotenv from "dotenv";
import useRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "https://medium-blog-ten-tau.vercel.app",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

// Define Routes
app.use("/api/v1/user", useRouter);
app.use("/api/v1/blog", blogRouter);

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
