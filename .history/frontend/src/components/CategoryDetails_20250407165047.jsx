import React, { useEffect, useState } from "react";
// ... other imports remain the same ...

const CategoryDetails = () => {
    const { categoryName } = useParams();
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [showAll, setShowAll] = useState(false); // New state

    // ... existing functions and effects remain the same ...

    return (
        <div>
            <Navbar/>
            <div className="min-h-screen bg-gray-50 ">
                <div className="container mx-auto px-0 lg:px-10 py-8 ">
                    {/* ... existing breadcrumb and headers ... */}
                    
                    {/* Posts Grid - Modified Section */}
                    {!loading && posts.length > 0 && (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {posts
                                    .slice(0, showAll ? posts.length : 8)
                                    .map((post, index) => (
                                        // ... existing post JSX ...
                                    ))}
                            </div>

                            {/* View More Button */}
                            {posts.length > 8 && !showAll && (
                                <div className="text-center mt-6">
                                    <button
                                        onClick={() => setShowAll(true)}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        View More Posts
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryDetails;