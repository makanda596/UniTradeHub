import React from "react";

const PostDetails = ({ post }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md">
      {/* Section 1: Small Images in Flex Row */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Post Images</h2>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {post.images.map((image, index) => (
            <div 
              key={index}
              className="flex-none w-20 h-20 rounded-md overflow-hidden border border-gray-200"
            >
              <img
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Big Post Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {post.title}
          </h1>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <span>Posted by {post.author}</span>
            <span className="mx-2">•</span>
            <span>{post.date}</span>
          </div>
        </div>

        <div className="prose max-w-none text-gray-700">
          <p>{post.content}</p>
          {post.additionalContent && (
            <p className="mt-4">{post.additionalContent}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                <span>{post.likes} Likes</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>{post.comments} Comments</span>
              </button>
            </div>
            <button className="text-gray-600 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage:
// const samplePost = {
//   title: "My Awesome Post",
//   author: "Jane Doe",
//   date: "May 15, 2023",
//   content: "This is the main content of the post. It can be as long as needed and will wrap properly within the container.",
//   additionalContent: "Here's some additional information about the post that appears after the main content.",
//   tags: ["react", "tailwind", "ui"],
//   likes: 42,
//   comments: 7,
//   images: [
//     "https://via.placeholder.com/300",
//     "https://via.placeholder.com/300/ff0000",
//     "https://via.placeholder.com/300/00ff00",
//     "https://via.placeholder.com/300/0000ff"
//   ]
// };

// <PostDetails post={samplePost} />

export default PostDetails;