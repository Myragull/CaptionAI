// pages/Home.jsx
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { FaPlus } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";


function Home() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  // fetch posts from backend
  useEffect(() => {
  async function fetchPosts() {
    try {
      const res = await fetch("http://localhost:3000/api/caption/getCaption", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();
      setPosts(data.captions || []); // use captions, not posts
    } catch (err) {
      console.error(err);
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
    const res = await fetch("http://localhost:3000/api/caption/create", {
      method: "POST",
      body: formData,
      credentials: "include", // same as withCredentials: true
    });

    if (!res.ok) {
      throw new Error("Failed to upload image");
    }

   const data = await res.json();
setPosts((prev) => [data.caption, ...prev]); 
  } catch (err) {
    console.error("Upload error:", err);
  }
};


  // toggle save
  async function handleToggleSave(postId) {
    try {
      const res = await fetch(`http://localhost:3000/api/caption/save/${postId}`, {
        method: "PATCH",
        credentials: "include", // include cookies
        headers: {
          "Content-Type": "application/json",
        },
      });
       const data = await res.json();

    setPosts(posts.map(p =>
      p._id === postId ? { ...p, isSaved: data.captionDoc.savedBy.includes(user._id) } : p
    ));

    } catch (error) {
      console.log(error);
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
