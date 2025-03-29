import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Appbar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("Guest");

  useEffect(() => {
      const savedName = localStorage.getItem("userName");  // 👈 Naam fetch karna
      console.log(savedName);
      
      if (savedName) {
          setName(savedName);  //  State update karna
      }
  }, []);

  return (
    <div className="border-b bg-white shadow-md flex justify-between items-center px-10 py-4">
      {/* Logo */}
      <Link
        to={"/blogs"}
        className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-gray-600 transition"
      >
        Medium
      </Link>

      {/* Right Section: Button + Avatar */}
      <div className="flex items-center gap-4">
        <div>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
            className="text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500 font-medium rounded-full text-sm px-5 py-2.5 transition duration-200 shadow-md"
          >
            Sign Out
          </button>
        </div>
        {/* Publish Button */}
        <Link to={`/publish`}>
          <button
            type="button"
            className="text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500 font-medium rounded-full text-sm px-5 py-2.5 transition duration-200 shadow-md"
          >
            New
          </button>
        </Link>

        {/* User Avatar */}
        <div className="border border-gray-300 p-1 rounded-full">
          <Avatar size="big" name={name} />{" "}
          {/* Agar name nahi mile toh "Guest" show karega */}
        </div>
      </div>
    </div>
  );
};
