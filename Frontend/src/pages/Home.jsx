// pages/Home.jsx
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { FaPlus } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import api from '../utils/api'


function Home() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  // fetch posts from backend
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await api.get("/caption/getCaption"); // ✅ use api
        setPosts(res.data.captions || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    }
    fetchPosts();
  }, []);

// handle image upload
 const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/caption/create", formData); // ✅ use api
      setPosts((prev) => [res.data.caption, ...prev]);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  // toggle save with optimistic updates
  async function handleToggleSave(postId) {
    try {
      // Find the post
      const postIndex = posts.findIndex(p => p._id === postId);
      if (postIndex === -1) return Promise.reject("Post not found");
      
      // Update optimistically
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        isSaved: !updatedPosts[postIndex].isSaved
      };
      setPosts(updatedPosts);
      
      // Make the API call
      const res = await api.patch(`/caption/save/${postId}`);
      return res;
    } catch (error) {
      console.error("Save error:", error);
      
      // Revert the optimistic update on error
      setPosts(prev => 
        prev.map(p => 
          p._id === postId 
            ? { ...p, isSaved: !p.isSaved } 
            : p
        )
      );
      
      throw error;
    }
  }

  return (
     <div className="relative min-h-screen p-4">
      {/* Show posts */}
      <div className="space-y-4">
        {posts.map((post, index) => (
  <PostCard key={index} post={post} onToggleSave={handleToggleSave} />
))}
      </div>

      {/* Floating upload button */}
      <label className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700">
        <FaPlus size={24} />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  );
}

export default Home;
