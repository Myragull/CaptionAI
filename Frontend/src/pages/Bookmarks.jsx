import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";

function Bookmarks() {
  const [savedPosts, setSavedPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchSaved() {
      try {
        const res = await fetch("http://localhost:3000/api/caption/getCaption", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        const saved = data.captions.filter(caption => caption.isSaved);
        setSavedPosts(saved);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSaved();
  }, []);

  // ✅ toggle save from bookmarks
  async function handleToggleSave(postId) {
    try {
      const res = await fetch(`http://localhost:3000/api/caption/save/${postId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      setSavedPosts(prev =>
        prev.map(p =>
          p._id === postId ? { ...p, isSaved: data.captionDoc.savedBy.includes(user._id) } : p
        )
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="p-4 space-y-4">
      {savedPosts.length === 0 && <p>No bookmarks yet</p>}
      {savedPosts.map(post => (
        <PostCard 
          key={post._id} 
          post={post} 
          onToggleSave={handleToggleSave} // now defined
        />
      ))}
    </div>
  );
}

export default Bookmarks;
