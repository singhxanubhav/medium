// Appbar.jsx
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Appbar = () => {
  const [name, setName] = useState("");  // State to store user name

  useEffect(() => {
    const storedName = "Harkirat";  // Get name from localStorage
    console.log(storedName);

    if (storedName) {
      setName(storedName);
    }
  }, []);  // Empty dependency array means it runs only once when component mounts

  return (
    <div className="border-b bg-white shadow-md flex justify-between items-center px-10 py-4">
      {/* Logo */}
      <Link to={"/blogs"} className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-gray-600 transition">
        Medium
      </Link>

      {/* Right Section: Button + Avatar */}
      <div className="flex items-center gap-4">
        {/* Publish Button */}
        <Link to={`/publish`}>
          <button
            type="button"
            className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 transition duration-200 shadow-md"
          >
            New
          </button>
        </Link>

        {/* User Avatar */}
        <div className="border border-gray-300 p-1 rounded-full">
          <Avatar size="big" name={name || "Guest"} /> {/* Agar name nahi mile toh "Guest" show karega */}
        </div>
      </div>
    </div>
  );
};
