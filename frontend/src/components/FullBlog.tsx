import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(blog.createdAt));
  console.log(formattedDate); // Example Output: 29 March 2025, 11:27 AM

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <Appbar />
      <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8 w-full max-w-screen-xl p-8 rounded-2xl shadow-xl bg-white border border-gray-200">
          {/* Blog Content */}
          <div className="col-span-8 space-y-6">
            <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight leading-tight animate__animated animate__fadeInUp">
              {blog.title}
            </h1>
            <p className="text-sm text-slate-500">Posted on {formattedDate}</p>
            <div className="prose prose-lg max-w-none text-gray-700 pt-4 animate__animated animate__fadeInUp">
              {blog.content}
            </div>
          </div>

          {/* Author Section */}
          <div className="col-span-4 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <div className="space-y-6 animate__animated animate__fadeInRight">
              <div className="text-slate-600 text-lg font-semibold">Author</div>
              <div className="flex items-center space-x-4">
                <Avatar size="big" name={blog.author.name || "Singh"} />
                <div>
                  <div className="text-xl font-bold text-gray-800">
                    {blog.author.name || "Kumar"}
                  </div>
                  <div className="pt-1 text-slate-500 text-sm italic">
                    "Bringing insights and creativity to life."
                  </div>
                </div>
              </div>
              <div className="pt-6 text-gray-600">
                Want to read more from {blog.author.name || "this author"}? Stay
                tuned for their next post!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
