import React, { useState } from "react";

const CreatePost = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [newPost, setNewPost] = useState({
        productName: "",
        description: "",
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewPost((prev) => ({ ...prev, image: file }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Post Created:", newPost);
        setIsOpen(false); // Close modal after submitting
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow-lg w-full max-w-sm">
            {/* Small Create Post Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                ➕ Create a Post
            </button>

            {/* Modal Popup for Creating Post */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Create a Post</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="productName"
                                placeholder="Product Name"
                                value={newPost.productName}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={newPost.description}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                required
                            ></textarea>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="w-full border rounded-lg p-2"
                                accept="image/*"
                            />
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                                >
                                    Post
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreatePost;
