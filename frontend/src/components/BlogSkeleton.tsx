import { Circle } from "./BlogCard";

export const BlogSkeleton = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="p-4 border-b border-gray-200 bg-white shadow-md rounded-lg w-screen max-w-screen-md cursor-pointer">
        {/* Header: Profile Info */}
        <div className="flex items-center gap-3">
          {/* Profile Picture Skeleton */}
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>

          {/* Author Details */}
          <div className="flex flex-col gap-1 w-48">
            <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
            <div className="h-2 bg-gray-200 rounded-full w-1/2"></div>
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="mt-4">
          <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
        </div>

        {/* Content Skeleton */}
        <div className="mt-3 space-y-2">
          <div className="h-3 bg-gray-200 rounded-full w-full"></div>
          <div className="h-3 bg-gray-200 rounded-full w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded-full w-2/3"></div>
        </div>

        {/* Footer: Timestamp */}
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <Circle />
          <div className="h-2 bg-gray-200 rounded-full w-10"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
