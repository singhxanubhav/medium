import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export const BlogCard = ({ id, authorName, title, content, publishedDate }: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`} className="block">
      <div className="p-6 bg-white rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition duration-200 cursor-pointer w-screen max-w-screen-md">
        {/* Author & Date Section */}
        <div className="flex items-center mb-3">
          <Avatar name={authorName} />
          <div className="ml-3">
            <p className="text-gray-700 font-medium">{authorName}</p>
            <p className="text-sm text-gray-500">{publishedDate}</p>
          </div>
        </div>

        {/* Blog Title */}
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

        {/* Blog Content Preview */}
        <p className="text-gray-600 leading-relaxed mt-2">{content.slice(0, 120) + "..."}</p>

        {/* Read Time */}
        <div className="text-gray-500 text-sm font-light mt-4">
          {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({ name, size = "small" }: { name: string; size?: "small" | "big" }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-700 text-white rounded-full ${
        size === "small" ? "w-8 h-8 text-sm" : "w-12 h-12 text-lg"
      }`}
    >
      {name[0].toUpperCase()}
    </div>
  );
}
